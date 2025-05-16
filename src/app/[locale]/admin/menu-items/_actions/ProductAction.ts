"use server";
import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { addProductSchema, updateProductSchema } from "@/validations/product";
import { Extra, ExtraIngredients, ProductSizes, Size } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addProduct = async (
    args: {
        locale: string;
        categoryId: string;
        options: {
            size: Partial<Size>[];
            extra: Partial<Extra>[];
        };
    },
    prevState: unknown,
    formData: FormData
) => {
    const message = await getTranslations("messages");

    const result = (await addProductSchema()).safeParse(
        Object.fromEntries(formData.entries())
    );

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    console.log(result);

    const data = result.data;
    const categoryId = args.categoryId;
    const imageFile = data.image as File;
    const imageUrl = Boolean(imageFile.size)
        ? await getImageUrl(imageFile)
        : null;

    console.log(imageUrl);
    try {
        if (imageUrl) {
            await db.product.create({
                data: {
                    ...data,
                    image: imageUrl,
                    categoryId,
                    basePrice: parseInt(data.basePrice),
                    sizes: {
                        createMany: {
                            data: args.options.size.map((size) => ({
                                name: size.name as ProductSizes,
                                price: Number(size.price),
                            })),
                        },
                    },
                    extras: {
                        createMany: {
                            data: args.options.extra.map((extra) => ({
                                name: extra.name as ExtraIngredients,
                                price: Number(extra.price),
                            })),
                        },
                    },
                },
            });
            revalidatePath(`/${args.locale}/${Routes.MENU}`);
            revalidatePath(`/${args.locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
            revalidatePath(`/${args.locale}`);
            redirect(`/${args.locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
            return {
                status: 201,
                message: message("productAdded"),
            };
        }
        return {};
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: message("unexpectedError"),
            formData,
        };
    }
};

const getImageUrl = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("pathName", "product_images");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        console.log(response);
        const image = (await response.json()) as { url: string };
        return image.url;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
    }
};

export const updateProduct = async (
    args: {
        locale: string;
        categoryId: string;
        productId: string;
        options: {
            size: Partial<Size>[];
            extra: Partial<Extra>[];
        };
    },
    prevState: unknown,
    formData: FormData
) => {
    const message = await getTranslations("");

    const result = (await updateProductSchema()).safeParse(
        Object.fromEntries(formData.entries())
    );

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    const data = result.data;
    const categoryId = args.categoryId;
    const imageFile = data.image as File;
    const imageUrl = Boolean(imageFile.size)
        ? await getImageUrl(imageFile)
        : undefined;

    const product = await db.product.findFirst({
        where: {
            id: args.productId,
        },
    });
    if (!product) {
        return {
            status: 400,
            message: message("unexpectedError"),
            formData,
        };
    }

    try {

        await db.product.update({
            where: {
                id: args.productId,
            },
            data: {
                name: data.name,
                description: data.description,
                image: imageUrl ?? product.image,
                categoryId,
                basePrice: parseInt(data.basePrice),
            },
        });

        await db.size.deleteMany({
            where: {
                productId: args.productId,
            }
        });
        await db.extra.deleteMany({
            where: {
                productId: args.productId,
            },
        });

        await db.size.createMany({
            data: args.options.size.map((size) => ({
                name: size.name as ProductSizes,
                price: Number(size.price),
                productId: args.productId
            })),
        })
        await db.extra.createMany({
            data: args.options.extra.map((extra) => ({
                name: extra.name as ExtraIngredients,
                price: Number(extra.price),
                productId: args.productId
            })),
        })




        revalidatePath(`/${args.locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
        revalidatePath(
            `/${args.locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${args.productId}/${Pages.EDIT}`
        );
        revalidatePath(`/${args.locale}`);
        revalidatePath(`/${args.locale}/${Routes.MENU}`);

        return {
            status: 200,
            message: message('updateProductSucess')
        }
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: message("unexpectedError"),
            formData,
        };
    }
};

export const productDelete = async (id: string, locale: string) => {
    const message = await getTranslations("");

    try {
        await db.product.delete({
            where: {
                id,
            },
        });
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
        revalidatePath(
            `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${id}/${Pages.EDIT}`
        );
        revalidatePath(`/${locale}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);

        return {
            status: 200,
            message: message("deleteProductSucess"),
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: message("unexpectedError"),
        };
    }
};
