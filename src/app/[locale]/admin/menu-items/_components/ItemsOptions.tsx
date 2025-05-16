/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslations } from "next-intl";
import { Plus, Trash2 } from "lucide-react";
import { Extra, ExtraIngredients, Size } from "@prisma/client";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ProductSizes } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { OptionKey } from "./Form";

interface Props {
    state: Partial<Size>[] | Partial<Extra>[];
    setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
    optionKey: OptionKey;
}

const sizeItems = [ProductSizes.Small, ProductSizes.Medium, ProductSizes.large];

const extraItems = [
    ExtraIngredients.bacon,
    ExtraIngredients.cheese,
    ExtraIngredients.onion,
    ExtraIngredients.pepper,
    ExtraIngredients.tomato,
];

const ItemsOptions = ({ state, setState, optionKey }: Props) => {
    const admin = useTranslations("admin");
    const addOptions = () => {
        setState((prev: any) => {
            return [...prev, { name: "", price: 0 }];
        });
    };
    const handleWithChange = (e: any, index: number, fieldName: any) => {
        const value = e.target.value;
        setState((prev: any) => {
            const arr = [...prev];
            arr[index][fieldName] = value;
            return arr;
        });
    };
    const removeItems = (indexForRemove: number) => {
        setState((prev: any) => {
            const arr = [...prev];
            return arr.filter((item, index: number) => index !== indexForRemove);
        });
    };
    const optionsNumber = (key: OptionKey) => {
        if (key === OptionKey.Sizes) return sizeItems.length > state.length;
        if (key === OptionKey.Extra) return extraItems.length > state.length;
    };

    return (
        <div>
            {state.map((item, index) => {
                return (
                    <div key={index} className="flex gap-4 mb-4">
                        <SelectOptionsItems
                            handleWithChange={handleWithChange}
                            state={state}
                            item={item}
                            index={index}
                            optionKey={optionKey}
                        />
                        <div className="space-y-1 basis-1/2 text-left">
                            <Label htmlFor="price">Prize</Label>
                            <Input
                                type="number"
                                name="price"
                                min={0}
                                placeholder="0"
                                className="bg-white focus-visible:ring-0"
                                onChange={(e) => handleWithChange(e, index, "price")}
                                value={item.price}
                            />
                        </div>
                        <div className="flex items-end">
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                type="button"
                                onClick={() => removeItems(index)}
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    </div>
                );
            })}
            {optionsNumber(optionKey) && (
                <Button
                    variant={"outline"}
                    type="button"
                    className="w-full"
                    onClick={addOptions}
                >
                    <Plus />{" "}
                    {optionKey === OptionKey.Sizes
                        ? admin("menu-items.addItemSize")
                        : admin("menu-items.addExtraItem")}
                </Button>
            )}
        </div>
    );
};

export default ItemsOptions;

interface SelectSizeProps {
    handleWithChange: (e: any, index: number, fieldName: any) => void;
    index: number;
    item: Partial<Size> | Partial<Extra>;
    state: Partial<Size>[] | Partial<Extra>[];
    optionKey: OptionKey;
}

export const SelectOptionsItems = ({
    handleWithChange,
    index,
    item,
    state,
    optionKey,
}: SelectSizeProps) => {
    const getSizes = (key: OptionKey) => {
        if (key === OptionKey.Sizes) {
            const size = state.map((item) => {
                return item.name;
            });
            return sizeItems.filter((e) => e !== size.find((item) => item === e));
        } else if (key === OptionKey.Extra) {
            const Extra = state.map((item) => {
                return item.name;
            });
            return extraItems.filter((e) => e !== Extra.find((item) => item === e));
        }
    };

    return (
        <div className="space-y-1 basis-1/2 text-left">
            <Label htmlFor="name">Name</Label>
            <Select
                name="name"
                onValueChange={(value) =>
                    handleWithChange({ target: { value } }, index, "name")
                }
                defaultValue={item.name ? item.name : "Select.."}
            >
                <SelectTrigger className=" bg-white focus:ring-0">
                    <SelectValue>{item.name ? item.name : "Select.."}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>
                            {optionKey === OptionKey.Sizes ? "Sizes" : "Extras"}{" "}
                        </SelectLabel>
                        {getSizes(optionKey)?.map((item) => {
                            return (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
