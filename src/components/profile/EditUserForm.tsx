"use client";
import { InputTypes, Routes, UserRole } from "@/constants/enums";
import useFormField from "@/hooks/useFormField";
import { Session } from "next-auth";
import Image from "next/image";
import FormField from "../form-field/FormField";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import Checkbox from "../form-field/Checkbox";
import { useActionState, useEffect, useState } from "react";
import { validationError } from "@/validations/auth";
import { updateProfile } from "./_actions/Profile";
import { IFormField } from "@/type/app";
import LoadingComponent from "../LoadingComponent";
import { Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";

interface profileProps {
    user: Session["user"];
}

const EditUserForm = ({ user }: profileProps) => {
    const { getFormFields } = useFormField({
        slug: Routes.PROFILE,
    });

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
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
        formData,
    };
    const save = useTranslations("");
    const [selectedImage, setSelectedImage] = useState(user.image ?? "");
    const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);

    const session = useSession()

    const [state, action, pending] = useActionState(
        updateProfile.bind(null, isAdmin),
        initialState
    );


    useEffect(() => {
        if (state?.message && state.status && !pending) {
            toast({
                title: state.message,
                className: state.status === 200 ? "text-green-400" : "text-destructive",
            });
        }
    }, [pending, state?.message, state?.status]);

    return (
        <form action={action} className="flex flex-col md:flex-row my-5">
            <div>
                <UploadImage
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                />
            </div>
            <div className="w-5/6 md:w-2/5 mx-auto">
                {getFormFields().map((field: IFormField) => {
                    const fieldValue =
                        state?.formData?.get(field.name) ?? formData.get(field.name);
                    return (
                        <div key={field.name}>
                            <FormField
                                error={state?.error}
                                {...field}
                                readOnly={field.type === InputTypes.EMAIL}
                                defaultValue={fieldValue as string}
                            />
                        </div>
                    );
                })}
                {session.data?.user.role === UserRole.ADMIN && (
                    <div className="flex items-center gap-2 my-4">
                        <Checkbox
                            checked={isAdmin}
                            onClick={() => setIsAdmin(!isAdmin)}
                            label="Admin"
                            name="admin"
                        />
                    </div>
                )}
                <Button type="submit" className="w-full">
                    {pending ? <LoadingComponent /> : save("save")}
                </Button>
            </div>
        </form>
    );
};

interface UploadImageProps {
    setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
    selectedImage: string;
}

export const UploadImage = ({
    setSelectedImage,
    selectedImage,
}: UploadImageProps) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                        alt="Add User Image"
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
                    id="profile-image"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <Label
                    htmlFor="profile-image"
                    className={`w-[200px] h-[200px] border rounded-full element-center duration-300 bg-gray-50/40 
                        ${selectedImage
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

export default EditUserForm;
