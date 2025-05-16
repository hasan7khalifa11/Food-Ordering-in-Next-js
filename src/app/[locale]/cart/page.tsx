import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Routes } from '@/constants/enums'
import React from 'react'
import CartItems from './_components/CartItems'
import CheckoutForm from './_components/CheckoutForm'
import { useTranslations } from 'next-intl'

const CartPage = () => {

    const cart = useTranslations('cart')

    return (
        <section className='my-8 md:my-16' id={Routes.CART}>
            <MaxWidthWrapper>
                <h1 className='text-primary italic text-4xl font-bold text-center'>
                    {cart('title')}
                </h1>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 h-full'>

                    <CartItems />

                    <CheckoutForm />

                </div>
            </MaxWidthWrapper>
        </section>
    )
}

export default CartPage