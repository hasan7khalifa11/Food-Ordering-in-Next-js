import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";

export const LoginSchema = async (locale: Locale) => {

    const validation = getTranslations({ locale, namespace: 'validation' })

    return z.object({
        email: z
            .string()
            .trim()
            .email({ message: (await validation)('validEmail') }),
        password: z
            .string()
            .min(6, { message: (await validation)('passwordMinLength') })
            .max(40, { message: (await validation)('passwordMaxLength') }),
    });
};

export const RegisterSchema = async () => {

    const validation = getTranslations('validation')

    return z.object({
        name: z.string().trim().min(4, { message: (await validation)('nameRequired') }),
        email: z
            .string()
            .trim()
            .email({ message: (await validation)('validEmail') }),
        password: z
            .string()
            .min(6, { message: (await validation)('passwordMinLength') })
            .max(40, { message: (await validation)('passwordMaxLength') }),
        confirmPassword: z
            .string().min(6, { message: (await validation)("confirmPasswordRequired") })
    }).refine((data) => data.password === data.confirmPassword, {
        message: (await validation)('passwordMismatch'),
        path: ["confirmPassword"]
    });
};

export type validationError =
    | {
        [key: string]: string[]
    } | undefined