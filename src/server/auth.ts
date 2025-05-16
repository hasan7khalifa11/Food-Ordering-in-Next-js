import { Environments, Pages, Routes } from "@/constants/enums";
import { DefaultSession, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { login } from "./_actions/auth";
import { Locale } from "@/i18n/routing";
import { JWT } from "next-auth/jwt";
import { User, UserRole } from "@prisma/client";

declare module "next-auth/jwt" {
    interface JWT extends Partial<User> {
        id: string;
        name: string;
        email: string;
        role: UserRole;
    }
}

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User;
    }
}

export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.image = token.image as string;
                session.user.country = token.country as string;
                session.user.city = token.city as string;
                session.user.postalCode = token.postalCode as string;
                session.user.streetAddress = token.streetAddress as string;
                session.user.phone = token.phone as string;
            }
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role: token.role,
                    image: token.image,
                },
            };
        },
        jwt: async ({ token }): Promise<JWT> => {
            const dbUser = await db.user.findUnique({
                where: {
                    email: token?.email,
                },
            });
            if (!dbUser) {
                return token;
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role,
                image: dbUser.image,
                city: dbUser.city,
                country: dbUser.country,
                phone: dbUser.phone,
                postalCode: dbUser.postalCode,
                streetAddress: dbUser.streetAddress,
            };
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 30 * 30,
        updateAge: 24 * 30 * 30,
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === Environments.DEV,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    placeholder: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials, req) {
                const currentUrl = req?.headers?.referer;
                const locale = currentUrl?.split("/")[3] as Locale;
                const res = await login(credentials, locale);

                if (res.status === 200 && res.user) {
                    return res.user;
                } else {
                    throw new Error(
                        JSON.stringify({
                            validationError: res.error,
                            responseError: res.message,
                        })
                    );
                }
            },
        }),
    ],
    adapter: PrismaAdapter(db),
    pages: {
        signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
    },
};
