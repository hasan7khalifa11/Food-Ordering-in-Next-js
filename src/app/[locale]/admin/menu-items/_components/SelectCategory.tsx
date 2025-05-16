import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { validationError } from "@/validations/auth";

interface SelectCategoryProps {
    error: validationError
    categoryId: string;
    setCategoryId: React.Dispatch<React.SetStateAction<string>>;
    categories: Category[];
}
const SelectCategory = ({
    categoryId,
    setCategoryId,
    categories,
    error
}: SelectCategoryProps) => {
    const currentCategory = categories.find((c) => c.id === categoryId);
    const category = useTranslations("");
    return (
        <>
            <Label className="mb-1" htmlFor="category">
                {category("category")}
            </Label>
            <div className="mt-1">
                <Select
                    name="category"
                    onValueChange={(value) => setCategoryId(value)}
                    defaultValue={currentCategory?.id}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {categories.map((category) => {
                                return (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {error && error['category'] && (
                <p
                    className={`text-accent mt-2 text-sm font-medium ${error['category'] ? "text-destructive" : ""
                        }`}
                >
                    {error['category']}
                </p>
            )}
        </>
    );
};

export default SelectCategory;
