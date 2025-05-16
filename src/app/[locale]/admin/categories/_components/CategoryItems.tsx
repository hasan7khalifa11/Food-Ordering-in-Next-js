"use client";
import { Category } from "@prisma/client";
import React from "react";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

interface CategoryItemsProps {
    category: Category;
}

const CategoryItems = ({ category }: CategoryItemsProps) => {
    return (
        <div className="max-w-[500px] mx-auto flex items-center justify-between my-3 px-4 py-2.5 border border-border rounded-md bg-gray-100 hover:bg-gray-50 duration-300">
            <div className="font-semibold text-lg">{category.name}</div>
            <div className="flex items-center gap-2">
                <EditCategory category={category} />
                <DeleteCategory category={category} />
            </div>
        </div>
    );
};

export default CategoryItems;
