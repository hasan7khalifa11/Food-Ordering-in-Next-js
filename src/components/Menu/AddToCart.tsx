"use client"
import React, { useState } from 'react'
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { fromatCurrency } from '@/lib/formatters'
import { Checkbox } from '../ui/checkbox'
// import { db } from '@/lib/prisma'
import { Product, Size, Extra, ProductSizes } from '@prisma/client'
import { ProductWithRelations } from '@/type/product'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addCartItem, removeCartItem, removeItemFromCart, selectCartItems } from '@/redux/features/cart/cartSlice'
import { getItemQuantity } from '@/lib/cart'

interface ItemsProps {
    item: ProductWithRelations
    addToCart: string
    pickYourSize: string
    anyExtras: string
}

const AddToCart = ({ item, addToCart, pickYourSize, anyExtras }: ItemsProps) => {

    const cart = useAppSelector(selectCartItems)
    const quantity = getItemQuantity(item.id, cart)

    const dispatch = useAppDispatch()

    const defaultSize =
        cart.find(element => element.id === item.id)?.size ||
        item.sizes.find((size) => size.name === ProductSizes.Small)

    const defaultExtra = cart.find(element => element.id === item.id)?.extras || []

    const [selectSize, setSelectSize] = useState<Size>(defaultSize!)
    const [selectExtra, setSelectExtra] = useState<Extra[]>(defaultExtra)

    const handleAddToCart = () => {
        dispatch(addCartItem({
            id: item.id,
            basePrice: item.basePrice,
            image: item.image,
            name: item.name,
            extras: selectExtra,
            size: selectSize,
        }))
    }




    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'lg'}>{addToCart}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-scroll">
                <DialogHeader className='flex flex-col items-center space-y-3'>
                    <Image src={item.image} alt='Pizza' className='object-cover' width={200} height={200} />
                    <DialogTitle className='font-bold text-xl'>{item.name}</DialogTitle>
                    <DialogDescription>
                        {item.description}
                    </DialogDescription>
                </DialogHeader>

                <div className='space-y-10'>
                    <div className='text-center space-y-4'>
                        <Label htmlFor='pick-size' className='font-bold text-lg'>{pickYourSize}</Label>
                        <PickSize
                            sizes={item.sizes}
                            item={item}
                            selectSize={selectSize}
                            setSelectSize={setSelectSize}
                        />
                    </div>
                    <div className='text-center space-y-4'>
                        <Label htmlFor='add-extras' className='font-bold text-lg'>{anyExtras}</Label>
                        <Extras extras={item.extras} selectExtra={selectExtra} setSelectExtra={setSelectExtra} />
                    </div>
                </div>


                <DialogFooter>
                    {quantity === 0 ? (
                        <Button type="submit" onClick={handleAddToCart} className='w-full h-10 mt-3 text-base'>
                            {addToCart} {fromatCurrency(item.basePrice + selectSize?.price + selectExtra.map(i => i.price).reduce((acc, cur) => acc + cur, 0))}
                        </Button>
                    ) : (
                        <ChooseQuantity quantity={quantity} item={item} selectSize={selectSize} selectExtra={selectExtra} />
                    )}

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddToCart


interface SizeProps {
    sizes: Size[],
    item: Product,
    selectSize: Size,
    setSelectSize: React.Dispatch<React.SetStateAction<Size>>
}

function PickSize({ sizes, item, selectSize, setSelectSize }: SizeProps) {
    return (
        <RadioGroup defaultValue="comfortable">
            {sizes.map(size => (
                <div key={size.id} className="flex items-center space-x-3 hover:bg-slate-50 duration-300 border border-border rounded-md p-3">
                    <RadioGroupItem
                        value={selectSize.name}
                        checked={selectSize.id === size.id}
                        id={size.id}
                        onClick={() => setSelectSize(size)}
                    />
                    <Label htmlFor={size.id} className='uppercase'>{size.name} {fromatCurrency(size.price + item.basePrice)}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}

interface ExtraProps {
    extras: Extra[],
    selectExtra: Extra[],
    setSelectExtra: React.Dispatch<React.SetStateAction<Extra[]>>
}

function Extras({ extras, selectExtra, setSelectExtra }: ExtraProps) {
    return (
        <div className="grid gap-2 uppercase">
            {extras.map(extra => (
                <div
                    key={extra.id}
                    className="flex  items-center space-x-3 hover:bg-slate-50 duration-300 border border-border rounded-md p-3"
                    dir='ltr'
                >
                    <Checkbox
                        id={extra.id}
                        onClick={() => setSelectExtra((ex) =>
                            ex.find((e) => e.id === extra.id) ? ex.filter(e => e.id !== extra.id) : ex.concat(extra)
                        )}
                        checked={Boolean(selectExtra.find((e) => e.id === extra.id))}
                    />
                    <Label
                        htmlFor={extra.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {extra.name} {fromatCurrency(extra.price)}
                    </Label>
                </div>
            ))}
        </div>
    )
}

interface QuantityProps {
    quantity: number
    item: ProductWithRelations
    selectSize: Size
    selectExtra: Extra[]
}

function ChooseQuantity({ quantity, item, selectSize, selectExtra }: QuantityProps) {

    const dispatch = useAppDispatch()

    const handleAddToCart = () => {
        dispatch(addCartItem({
            id: item.id,
            basePrice: item.basePrice,
            image: item.image,
            name: item.name,
            extras: selectExtra,
            size: selectSize,
        }))
    }

    const handleRemoveFromCart = () => {
        dispatch(removeCartItem({
            id: item.id,
        }))
    }

    const handleRemoveItemFromCart = () => {
        dispatch(removeItemFromCart({
            id: item.id,
        }))
    }


    return (
        <div className='w-full flex flex-col items-center justify-center gap-3'>
            <div className='w-full flex items-center justify-center gap-5'>
                <Button size={'icon'} variant={'outline'} onClick={handleRemoveFromCart}>-</Button>
                <div className={`${buttonVariants({ variant: 'default', size: 'lg' })}`}>{quantity}</div>
                <Button size={'icon'} variant={'outline'} onClick={handleAddToCart}>+</Button>
            </div>
            <Button onClick={handleRemoveItemFromCart}>Remove</Button>
        </div>
    )
}