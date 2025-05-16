import { fromatCurrency } from '@/lib/formatters'
import Image from 'next/image'
import React from 'react'
import AddToCart from './AddToCart'
import { useTranslations } from 'next-intl'

interface SellersProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any
}

const MenuItem = ({ item }: SellersProps) => {

    const menuItem = useTranslations('menuItem')
    const addToCart = menuItem('addToCart')
    const pickYourSize = menuItem('pickYourSize')
    const anyExtras = menuItem('anyExtras')

    return (
        <div key={item.id} className='bg-slate-100 p-5 text-center space-y-3 rounded-lg hover:bg-background duration-500 border border-border shadow hover:shadow-md'>
            <div className='relative w-44 h-40 mx-auto'>
                <Image src={item.image} alt='Pizza' className='object-cover' width={176} height={144} />
            </div>
            <div className='flex justify-between mx-5'>
                <div className='text-xl font-bold'>{item.name}</div>
                <div className=' font-bold'>{fromatCurrency(item.basePrice)}</div>
            </div>
            <div className='text-gray-500 text-lg font-semibold'>{item.description}</div>
            <AddToCart item={item} addToCart={addToCart} pickYourSize={pickYourSize} anyExtras={anyExtras} />
        </div>
    )
}

export default MenuItem