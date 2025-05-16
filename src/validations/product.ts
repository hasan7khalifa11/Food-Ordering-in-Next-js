// import { getTranslations } from "next-intl/server";
// import { z } from "zod";

import { getTranslations } from "next-intl/server";
import { z } from "zod";

// const imageValidation = async (isRequired: boolean) => {
//     const admin = getTranslations("admin");
//     return !isRequired
//         ? z.custom((val) => val instanceof File)
//         : z.custom(
//             (val) => {
//                 if (typeof val !== "object" || !val) {
//                     return false;
//                 }
//                 if (!(val instanceof File)) {
//                     return false;
//                 }
//                 const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
//                 return validMimeTypes.includes(val.type);
//             },
//             {
//                 message: (await admin)("menu-items.form.image.validation.required"),
//             }
//         );
// };
// const getCommonValidations = async () => {
//     const admin = getTranslations("admin");

//     return {
//         name: z.string().trim().min(1, {
//             message: (await admin)("menu-items.form.name.validation.required"),
//         }),
//         description: z.string().trim().min(1, {
//             message:
//                 (await admin)("menu-items.form.description.validation.required"),
//         }),
//         basePrice: z.string().min(1, {
//             message:
//                 (await admin)("menu-items.form.basePrice.validation.required"),
//         }),
//         categoryId: z.string().min(1, {
//             message:
//                 (await admin)("menu-items.form.categoryId.validation.required"),
//         }),
//     };
// };
// // export const addProductSchema = () => {
// //     return z.object({
// //         ...getCommonValidations(),
// //         image: imageValidation(true),
// //     });
// // };

export const addProductSchema = async () => {
    const admin = getTranslations("admin");

    return z.object({
        name: z
            .string()
            .trim()
            .min(1, {
                message: (await admin)("menu-items.form.name.validation.required"),
            }),
        description: z
            .string()
            .trim()
            .min(1, {
                message: (await admin)(
                    "menu-items.form.description.validation.required"
                ),
            }),
        basePrice: z.string().min(1, {
            message: (await admin)("menu-items.form.basePrice.validation.required"),
        }),

        image: z.custom(
            (val) => {
                if (typeof val !== "object" || !val) {
                    return false;
                }
                if (!(val instanceof File)) {
                    return false;
                }
                const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
                return validMimeTypes.includes(val.type);
            },
            {
                message: (await admin)("menu-items.form.image.validation.required"),
            }
        ),
    });
};

export const updateProductSchema = async () => {
    const admin = getTranslations("admin");
    return z.object({
        name: z
            .string()
            .trim()
            .min(1, {
                message: (await admin)("menu-items.form.name.validation.required"),
            }),
        description: z
            .string()
            .trim()
            .min(1, {
                message: (await admin)(
                    "menu-items.form.description.validation.required"
                ),
            }),
        basePrice: z.string().min(1, {
            message: (await admin)("menu-items.form.basePrice.validation.required"),
        }),
        image: z.custom((val) => val instanceof File),
    });
};
