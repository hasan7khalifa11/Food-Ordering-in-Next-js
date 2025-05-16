"use server"

import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const userDelete = async (id: string, locale: string) => {
    const message = await getTranslations("");

    try {

        await db.user.delete({
            where: {
                id
            }
        })
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`)

        return {
            status: 200,
            message: message('deleteUserSucess')
        }

    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: message("unexpectedError"),
        };
    }
}