import { getTranslations } from "next-intl/server"
import { z } from "zod"

export const CreateCatecorySchema = async () => {
    const admin = getTranslations('admin')
    return z.object({
        category: z.string().trim().min(4, { message: (await admin)('categories.form.name.validation.required') })
    })
}
export const UpdateCatecorySchema = async () => {
    const admin = getTranslations('admin')
    return z.object({
        updateCategory: z.string().trim().min(4, { message: (await admin)('categories.form.name.validation.required') })
    })
}