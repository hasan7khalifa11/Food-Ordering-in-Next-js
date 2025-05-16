/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { NextRequest } from 'next/server';
// import { withAuth } from 'next-auth/middleware';
// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';
// import { Pages, Routes } from './constants/enums';

// const publicPages = [
//     '/',
//     `/${Routes.AUTH}/${Pages.LOGIN}`
//     // (/secret requires auth)
// ];

// const intlMiddleware = createMiddleware(routing);

// const authMiddleware = withAuth(
//     // Note that this callback is only invoked if
//     // the `authorized` callback has returned `true`
//     // and not for pages listed in `pages`.
//     (req) => intlMiddleware(req),
//     {
//         callbacks: {
//             authorized: ({ token }) => token != null
//         },
//         pages: {
//             signIn: `/${Routes.AUTH}/${Pages.LOGIN}`
//         }
//     }
// );

// export default function middleware(req: NextRequest) {
//     const publicPathnameRegex = RegExp(
//         `^(/(${routing.locales.join('|')}))?(${publicPages
//             .flatMap((p) => (p === '/' ? ['', '/'] : p))
//             .join('|')})/?$`,
//         'i'
//     );
//     const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

//     // const currentLocale = request.url.split('/')[3] as Locale

// // const pathname = request.nextUrl.pathname

// // const isAuth = await getToken({ req: request })

// // const isAuthPage = pathname.startsWith(`/${currentLocale}/${Routes.AUTH}`)

//     if (isPublicPage) {
//         return intlMiddleware(req);
//     } else {
//         return (authMiddleware as any)(req);
//     }
// }

// export const config = {
//     // Skip all paths that should not be internationalized
//     matcher: ['/((?!api|_next|.*\\..*).*)']
// };

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { Locale, routing } from "./i18n/routing";
import { Pages, Routes } from "./constants/enums";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
// import { getToken } from "next-auth/jwt";

const privatePages = [
    `/${Routes.ADMIN}`,
    `/${Routes.PROFILE}`,
    // (/secret requires auth)
];

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
    // Note that this callback is only invoked if
    // the `authorized` callback has returned `true`
    // and not for pages listed in `pages`.
    (req) => intlMiddleware(req),
    {
        callbacks: {
            authorized: ({ token }) => token != null,
        },
        pages: {
            signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,

        },

    }
);

export default async function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.url);

    const privatePathnameRegex = RegExp(
        `^(/(${routing.locales.join('|')}))?(${privatePages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );
    const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

    const currentLocale = req.url.split("/")[3] as Locale;

    const pathname = req.nextUrl.pathname;

    const isAuth = await getToken({ req: req });

    const role = isAuth?.role
    console.log(role)

    // const isAuthPage = pathname.startsWith(`/${currentLocale}/${Routes.AUTH}`);

    // const protectedRoute = [Routes.PROFILE, Routes.ADMIN];

    // const isProtectedRoute = protectedRoute.some((route) =>
    //     pathname.startsWith(`/${currentLocale}/${route}`)
    // );

    if (isAuth && pathname.startsWith(`/${currentLocale}/${Routes.ADMIN}`)) {
        // const role = isAuth.role
        if (role === UserRole.USER) {
            return NextResponse.redirect(new URL(`/${currentLocale}/${Routes.PROFILE}`, req.url))
        }
    }
    if (isAuth && pathname.startsWith(`/${currentLocale}/${Routes.PROFILE}`)) {
        const role = isAuth.role
        if (role === UserRole.ADMIN) {
            return NextResponse.redirect(new URL(`/${currentLocale}/${Routes.ADMIN}`, req.url))
        }
    }

    if (isPrivatePage) {
        return (authMiddleware as any)(req);
    } else {
        return intlMiddleware(req);
    }

}


export const config = {
    // Skip all paths that should not be internationalized
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
