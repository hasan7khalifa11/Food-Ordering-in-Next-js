"use client";
import FormField from "@/components/form-field/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pages, Routes } from "@/constants/enums";
import useFormField from "@/hooks/useFormField";
import { Camera } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SelectCategory from "./SelectCategory";
import { Category, Extra, Size } from "@prisma/client";
import ItemsOptions from "./ItemsOptions";
import Link from "@/components/link/Link";
import { validationError } from "@/validations/auth";
import {
    addProduct,
    productDelete,
    updateProduct,
} from "../_actions/ProductAction";
import LoadingComponent from "@/components/LoadingComponent";
import { toast } from "@/hooks/use-toast";
import { ProductWithRelations } from "@/type/product";

interface CategoriesProps {
    categories: Category[];
    product?: ProductWithRelations;
}

const Form = ({ categories, product }: CategoriesProps) => {
    const { getFormFields } = useFormField({ slug: Pages.NEW });

    const [selectedImage, setSelectedImage] = useState(
        product ? product?.image : ""
    );
    const [categoryId, setCategoryId] = useState(
        product ? product?.categoryId : categories[0].id
    );
    const [size, setSize] = useState<Partial<Size>[]>(
        product ? product.sizes : []
    );
    const [extra, setExtra] = useState<Partial<Extra>[]>(
        product ? product.extras : []
    );

    const locale = useLocale();

    const formData = new FormData();
    Object.entries(product ?? {}).forEach(([key, value]) => {
        if (value !== null && value !== undefined && key !== "image") {
            formData.append(key, value.toString());
        }
    });

    const initialState: {
        message?: string;
        error?: validationError;
        status?: number | null;
        formData?: FormData | null;
    } = {
        message: "",
        error: {},
        status: null,
        formData: null,
    };

    // const [state, action, pending] = useActionState(addProduct.bind(null, { locale, categoryId }), initialState)
    const [state, action, pending] = useActionState(
        product
            ? updateProduct.bind(null, { locale, categoryId, productId: product.id, options: { size, extra } })
            : addProduct.bind(null, { locale, categoryId, options: { size, extra } }),
        initialState
    );

    const productId = product ? product.id : '';

    useEffect(() => {
        if (state?.message && state.status && !pending) {
            toast({
                title: state.message,
                className: state.status === 201 || 200 ? "text-green-400" : "text-destructive",
            });
        }
    }, [pending, state?.message, state?.status]);

    return (
        <form action={action} className="flex flex-col md:flex-row">
            <div>
                <ImageUplaod
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                />
            </div>
            <div className="w-5/6 md:w-2/5 mx-auto">
                {getFormFields().map((field) => {
                    const fieldValue =
                        (state?.formData?.get(field.name) as string) ??
                        formData.get(field.name);
                    return (
                        <div key={field.name}>
                            <FormField
                                {...field}
                                error={state?.error}
                                defaultValue={fieldValue}
                            />
                        </div>
                    );
                })}
                <div className="mb-4">
                    <SelectCategory
                        categoryId={categoryId}
                        setCategoryId={setCategoryId}
                        categories={categories}
                        error={state?.error}
                    />
                </div>
                <div className="mb-4">
                    <AddSize size={size} setSize={setSize} />
                </div>
                <div className="mb-4">
                    <AddExtra extra={extra} setExtra={setExtra} />
                </div>

                <FormActions
                    pending={pending}
                    product={product}
                    productId={productId}
                />
            </div>
        </form>
    );
};

export default Form;

interface SelectedImageProps {
    selectedImage: string;
    setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}

export const ImageUplaod = ({
    selectedImage,
    setSelectedImage,
}: SelectedImageProps) => {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
        }
    };

    return (
        <div className="relative flex justify-center items-center">
            <div className="w-[200px] h-[200px] element-center absolute overflow-hidden rounded-full">
                {selectedImage && (
                    <Image
                        alt="Add Product Image"
                        src={selectedImage}
                        width={200}
                        height={200}
                        className="object-cover"
                    />
                )}
            </div>
            <div className=" relative flex justify-center items-center">
                <Input
                    type="file"
                    name="image"
                    accept="images/*"
                    id="product-image"
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <Label
                    htmlFor="product-image"
                    className={`w-[200px] h-[200px] border rounded-full element-center duration-300 bg-gray-50/40 ${selectedImage
                        ? "opacity-0 transition-opacity hover:opacity-100"
                        : ""
                        }`}
                >
                    <Camera className="text-gray-600" />
                </Label>
            </div>
        </div>
    );
};

const FormActions = ({
    pending,
    product,
    productId,
}: {
    pending: boolean;
    product?: ProductWithRelations;
    productId: string;
}) => {
    const button = useTranslations("");
    const locale = useLocale();
    console.log('delete', locale)

    const [state, setState] = useState({
        isLoading: false,
        message: "",
        status: 0,
    });

    const handleDelete = async () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        try {
            const res = await productDelete(productId, locale);
            setState(() => ({
                isLoading: false,
                status: res.status,
                message: res.message,
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    };
    useEffect(() => {
        if (state?.message && state.status && !state.isLoading) {
            toast({
                title: state.message,
                className: state.status === 200 ? 'text-green-400' : 'text-destructive'
            })
        }
    }, [state.isLoading, state.message, state.status])

    return (
        <div className="space-y-4 my-5">
            <div className="flex gap-5">
                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? (
                        <LoadingComponent />
                    ) : product ? (
                        button("save")
                    ) : (
                        button("create")
                    )}
                </Button>
                {product && (
                    <Button
                        type="button"
                        onClick={handleDelete}
                        className="w-full"
                        disabled={state.isLoading}
                    >
                        {state.isLoading ? <LoadingComponent /> : button("delete")}
                    </Button>
                )}
            </div>
            <div>
                <Link href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`}>
                    <Button variant={"outline"} className="w-full">
                        {button("cancel")}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export enum OptionKey {
    Sizes,
    Extra,
}

interface SizeProps {
    size: Partial<Size>[];
    setSize: React.Dispatch<React.SetStateAction<Partial<Size>[]>>;
}

export const AddSize = ({ size, setSize }: SizeProps) => {
    return (
        <Accordion
            type="single"
            collapsible
            className="px-4 rounded-lg w-4/6 bg-gray-50"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Size</AccordionTrigger>
                <AccordionContent className="text-center">
                    <ItemsOptions
                        state={size}
                        setState={setSize}
                        optionKey={OptionKey.Sizes}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

interface ExtraProps {
    extra: Partial<Extra>[];
    setExtra: React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
}
export const AddExtra = ({ extra, setExtra }: ExtraProps) => {
    return (
        <Accordion
            type="single"
            collapsible
            className="px-4 rounded-lg w-4/6 bg-gray-50"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Extra</AccordionTrigger>
                <AccordionContent className="text-center">
                    <ItemsOptions
                        state={extra}
                        setState={setExtra}
                        optionKey={OptionKey.Extra}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
