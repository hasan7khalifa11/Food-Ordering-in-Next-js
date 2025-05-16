"use server";

import { db } from "@/lib/prisma";
import { LoginSchema, RegisterSchema } from "@/validations/auth";
import { getTranslations } from "next-intl/server";
import bcrypt from "bcrypt";
import { Locale } from "@/i18n/routing";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/constants/enums";
// import { Locale } from "@/i18n/routing";

// interface LoginSchemaProps {
//     credentials: Record<"email" | "password", string> | undefined,
//     params: { locale: string }
// }

export const login = async (
    credentials: Record<"email" | "password", string> | undefined,
    locale: Locale
) => {
    // const locale = params.locale
    // console.log(locale)

    const message = await getTranslations({ locale, namespace: "messages" });

    const result = (await LoginSchema(locale)).safeParse(credentials);

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            status: 400,
        };
    }

    try {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
        });
        if (!user) {
            return { message: message("userNotFound"), status: 401 };
        }

        const hashedPassword = user.password;

        const isValidPassword = await bcrypt.compare(
            result.data.password,
            hashedPassword
        );
        console.log(isValidPassword);
        if (!isValidPassword) {
            return {
                message: message("incorrectPassword"),
                status: 401,
            };
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            status: 200,
            message: message("loginSuccessful"),
        };
    } catch (e) {
        console.log(e);
        return {
            message: message("unexpectedError"),
            status: 500,
        };
    }
};

export const signUp = async (locale: string, prevState: unknown, formData: FormData) => {
    const message = await getTranslations("messages");

    const result = (await RegisterSchema()).safeParse(
        Object.fromEntries(formData.entries())
    );

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    try {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
        });

        if (user) {
            return {
                message: message("userAlreadyExists"),
                status: 409,
                formData,
            };
        }

        const hashedPassword = await bcrypt.hash(result.data.password, 10);

        const createUser = await db.user.create({
            data: {
                email: result.data.email,
                name: result.data.name,
                password: hashedPassword,
            },
        });
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`)

        return {
            status: 201,
            message: message("accountCreated"),
            user: {
                id: createUser.id,
                name: createUser.name,
                email: createUser.email,

            },
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: message("unexpectedError"),
        };
    }
};
