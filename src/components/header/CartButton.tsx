import React from 'react'
import Link from '../link/Link'
import { ShoppingCartIcon } from 'lucide-react'
import { useAppSelector } from '@/redux/hooks'
import { selectCartItems } from '@/redux/features/cart/cartSlice'
import { getCartQuantity } from '@/lib/cart'
import { useLocale } from 'next-intl'

const CartButton = () => {

    const cart = useAppSelector(selectCartItems)
    const quantity = getCartQuantity(cart)

    const locale = useLocale()

    return (
        <Link href={`/${locale}/cart`} className={`relative block group ${locale === 'en' ? 'ml-3 md:ml-4' : 'mr-3 md:mr-4'}`} >
            {cart && cart.length > 0 && <span
                className='absolute text-sm w-5 h-5 bg-primary rounded-full text-white -top-4 start-4 text-center'
            >
                {quantity}
            </span>}
            <ShoppingCartIcon className='text-gray-500 group-hover:text-primary duration-300 transition-colors' />
        </Link>
    )
}

export default CartButton