"use client"

import { Button } from '@/components/ui/button'
import { deliveryFee, getSubTotal } from '@/lib/cart'
import { fromatCurrency } from '@/lib/formatters'
import { removeItemFromCart, selectCartItems } from '@/redux/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

const CartItems = () => {

    const cart = useAppSelector(selectCartItems)
    const dispatch = useAppDispatch()
    const subTotal = getSubTotal(cart)

    useEffect(() => {
        localStorage.setItem('cartItem', JSON.stringify(cart));
    }, [cart]);

    return (
        <div>
            {cart && cart.length > 0 ? (
                <div>
                    {cart.map(item => {
                        return (
                            <div key={item.id} className='flex flex-col md:flex-row justify-between items-center gap-6'>
                                <div className='flex items-center gap-4 rounded-md'>
                                    <div className='relative w-24 h-24 rounded-md'>
                                        <Image src={item.image} alt={item.name} fill className='object-contain' />
                                    </div>
                                    <div>
                                        <h4 className='font-bold text-lg'>{item.name}</h4>
                                        <div className='relative'>
                                            <div className='flex justify-between items-center'>
                                                {
                                                    item.size &&
                                                    <span className='text-gray-500 font-semibold text-sm'>
                                                        Size: {item.size.name}
                                                    </span>
                                                }
                                                <span>
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                            {
                                                item.extras &&
                                                <div className='flex gap-1 text-gray-500 font-semibold text-sm'>
                                                    <span>Extras:</span>
                                                    <div>
                                                        {item.extras.map(extra => (
                                                            <div key={extra.id}>
                                                                <span>{extra.name} {fromatCurrency(extra.price)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='font-bold flex justify-end items-center gap-4'>
                                    <strong>
                                        {fromatCurrency(item.basePrice + (item.size?.price || 0))}
                                    </strong>
                                    <Button variant={'secondary'} size={'icon'} onClick={() => dispatch(removeItemFromCart({ id: item.id }))}>
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                    <div className='flex flex-col items-end py-5'>
                        <span className='text-gray-500 font-semibold'>
                            SubTotal: <strong className='text-black'>{fromatCurrency(subTotal)}</strong>
                        </span>
                        <span className='text-gray-500 font-semibold'>
                            Delivery: <strong className='text-black'>{fromatCurrency(deliveryFee)}</strong>
                        </span>
                        <span className='text-gray-500 font-semibold'>
                            Total: <strong className='text-black'>{fromatCurrency(subTotal + deliveryFee)}</strong>
                        </span>
                    </div>
                </div>
            ) : (
                <div>There are no items in your cart. Add some</div>
            )}
        </div>
    )
}

export default CartItems