// 'use server'
// import { Pages, Routes } from "@/constants/enums";
// import { db } from "@/lib/prisma";
// import { UpdateProfileSchema } from "@/validations/profile";
// import { getLocale, getTranslations } from "next-intl/server";
// import { revalidatePath } from "next/cache";

// export const updateProfile = async (prevState: unknown, formData: FormData) => {
//     const message = await getTranslations("messages");

//     const locale = await getLocale()

//     const result = (await UpdateProfileSchema()).safeParse(
//         Object.fromEntries(formData.entries())
//     );

//     if (result.success === false) {
//         return {
//             error: result.error.formErrors.fieldErrors,
//             formData,
//         };
//     }

//     const data = result.data;
//     console.log(data)
//     const imageFile = data.image as File
//     console.log(imageFile)

//     const imageUrl = Boolean(imageFile.size) ? await getImageUrl(imageFile) : undefined;

//     try {
//         const user = await db.user.findUnique({
//             where: {
//                 email: data.email,
//             },
//         });

//         if (!user) {
//             return {
//                 message: message("userNotFound"),
//                 status: 401,
//                 formData,
//             };
//         }

//         await db.user.update({
//             where: {
//                 email: user.email,
//             },
//             data: {
//                 ...data,
//                 image: imageUrl ?? user.image,
//             },
//         });

//         revalidatePath(`/${locale}/${Routes.PROFILE}`)
//         revalidatePath(`/${locale}/${Routes.ADMIN}`)
//         revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`)
//         revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`)

//         return {
//             status: 200,
//             message: message('updateProfileSucess')
//         }
//     } catch (error) {
//         console.error(error);
//         return {
//             status: 500,
//             message: message("unexpectedError"),
//         };
//     }
// };

// const getImageUrl = async (imageFile: File) => {
//     const formData = new FormData();
//     formData.append("file", imageFile);
//     formData.append("pathName", "profile-images");

//     try {
//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
//             {
//                 method: "POST",
//                 body: formData,
//             }
//         );
//         const image = await response.json() as { url: string }
//         return image.url
//     } catch (error) {
//         console.error("Error uploading file to Cloudinary", error);
//     }
// };


"use server";
import { Pages, Routes, UserRole } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { UpdateProfileSchema } from "@/validations/profile";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const updateProfile = async (
    isAdmin: boolean,
    prevState: unknown,
    formData: FormData
) => {
    const message = await getTranslations("messages");

    const locale = await getLocale()
    const result = (await UpdateProfileSchema()).safeParse(
        Object.fromEntries(formData.entries())
    );

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }
    const data = result.data;
    const imageFile = data.image as File;
    const imageUrl = Boolean(imageFile.size)
        ? await getImageUrl(imageFile)
        : undefined;

    try {
        const user = await db.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            return {
                message: message("userNotFound"),
                status: 401,
                formData,
            };
        }
        await db.user.update({
            where: {
                email: user.email,
            },
            data: {
                ...data,
                image: imageUrl ?? user.image,
                role: isAdmin ? UserRole.ADMIN : UserRole.USER
            },
        });
        revalidatePath(`/${locale}/${Routes.PROFILE}`);
        revalidatePath(`/${locale}/${Routes.ADMIN}`);
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
        revalidatePath(
            `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`
        );
        return {
            status: 200,
            message: message("updateProfileSucess"),
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: message("unexpectedError"),
        };
    }
};

const getImageUrl = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("pathName", "profile_images");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const image = (await response.json()) as { url: string };
        return image.url;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
    }
};