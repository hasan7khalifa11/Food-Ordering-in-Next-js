"use server";

import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import {
    CreateCatecorySchema,
    UpdateCatecorySchema,
} from "@/validations/catecory";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const createCatecory = async (
    locale: string,
    prevState: unknown,
    formData: FormData
) => {
    const message = await getTranslations("messages");

    const result = (await CreateCatecorySchema()).safeParse(
        Object.fromEntries(formData.entries())
    );

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    const data = result.data;

    try {
        await db.category.create({
            data: {
                name: data.category,
            },
        });
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);

        return {
            status: 201,
            message: message("categoryAdded"),
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: message("unexpectedError"),
        };
    }
};

interface ArgsProps {
    locale: string;
    id: string;
}

export const UpdateCategory = async (
    args: ArgsProps,
    prevState: unknown,
    formData: FormData
) => {
    const message = await getTranslations("messages");

    const result = (await UpdateCatecorySchema()).safeParse(
        Object.fromEntries(formData.entries())
    );

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    const data = result.data;

    try {
        await db.category.update({
            where: {
                id: args.id,
            },
            data: {
                name: data.updateCategory,
            },
        });
        revalidatePath(`/${args.locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
        revalidatePath(`/${args.locale}/${Routes.MENU}`);

        return {
            status: 200,
            message: message("updatecategorySucess"),
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: message("unexpectedError"),
        };
    }
};

export const DeleteCategory = async (id: string, locale: string) => {
    const message = await getTranslations("messages");

    try {
        await db.category.delete({
            where: {
                id,
            },
        });

        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);

        return {
            message: message("deleteCategorySucess"),
            status: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: message("unexpectedError"),
        };
    }
};
