"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getTotalAmount } from '@/lib/cart'
import { fromatCurrency } from '@/lib/formatters'
import { selectCartItems } from '@/redux/features/cart/cartSlice'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

const CheckoutForm = () => {

    const cart = useAppSelector(selectCartItems)
    const totalAmount = getTotalAmount(cart)

    return (
        cart && cart.length > 0 &&
        <div className='grid gap-6 bg-gray-100 rounded-md p-4'>
            <h2 className='text-2xl font-semibold text-black'>Checkout</h2>
            <form className='grid gap-2'>
                <div className='grid gap-1'>
                    <Label htmlFor='phone' className='text-gray-500 font-semibold'>
                        Phone
                    </Label>
                    <Input id='phone' type='text' name='phone' placeholder='Enter Your phone' />
                </div>
                <div className='grid gap-1'>
                    <Label htmlFor='addrees' className='text-gray-500 font-semibold'>
                        Street Address
                    </Label>
                    <Textarea id='addrees' className='resize-none' name='addrees' placeholder='Enter Your addrees' />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='grid gap-1'>
                        <Label htmlFor='postal-code' className='text-gray-500 font-semibold'>
                            Postal Code
                        </Label>
                        <Input id='postal-code' type='text' name='postal-code' placeholder='Enter Your Postal Code' />
                    </div>
                    <div className='grid gap-1'>
                        <Label htmlFor='city' className='text-gray-500 font-semibold'>
                            City
                        </Label>
                        <Input id='city' type='text' name='city' placeholder='Enter Your city' />
                    </div>
                </div>
                <div className='grid gap-1'>
                    <Label htmlFor='country' className='text-gray-500 font-semibold'>
                        Country
                    </Label>
                    <Input id='country' type='text' name='country' placeholder='Enter Your country' />
                </div>
                <Button >Pay {fromatCurrency(totalAmount)}</Button>
            </form>
        </div>
    )
}

export default CheckoutForm