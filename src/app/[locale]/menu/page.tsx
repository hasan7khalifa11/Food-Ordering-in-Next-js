import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Menu from '@/components/Menu/Menu'
import { Routes } from '@/constants/enums'
import { getProductByCategory } from '@/server/db/product'
import React from 'react'

const MenuPage = async () => {

    const cat = await getProductByCategory()

    return (
        <section className='my-8 md:my-16' id={Routes.MENU}>
            <MaxWidthWrapper>
                {cat.map(item => (
                    <div key={item.id} className='text-center'>
                        <div className='italic text-primary text-4xl font-bold my-5'>
                            {item.name}
                        </div>
                        <Menu items={item.product} />
                    </div>
                ))}
            </MaxWidthWrapper>
        </section>
    )
}

export default MenuPage