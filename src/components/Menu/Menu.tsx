import React from 'react'
import MenuItem from './MenuItem'
import { Product } from '@prisma/client'
import { useTranslations } from 'next-intl'

interface MenuProps {
    items: Product[]
}

const Menu = ({ items }: MenuProps) => {

    const noProductsFound = useTranslations('')

    return items?.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {items.map(item => {
                return (
                    <MenuItem key={item.id} item={item} />
                )
            })}
        </div>
    ) : (
        <p className='text-center text-gray-500'>{noProductsFound('noProductsFound')}</p>
    )
}

export default Menu