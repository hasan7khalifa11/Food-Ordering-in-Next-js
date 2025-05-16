import { getProduct, getProducts } from '@/server/db/product'
import React from 'react'
import Form from '../../_components/Form'
import { getCategories } from '@/server/db/category'
import { redirect } from 'next/navigation'
import { Pages, Routes } from '@/constants/enums'
import { getLocale } from 'next-intl/server'



export async function generateStaticParams() {
    const products = await getProducts()

    return products.map(product => ({ productId: product.id }))
}

interface ProductIdProps {
    params: Promise<{
        productId: string
    }>
}

const page = async ({ params }: ProductIdProps) => {


    const { productId } = await params

    const product = await getProduct(productId)
    const categories = await getCategories()
    const locale = await getLocale()

    if (!product) {
        redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
    }
    return (
        <div>
            <Form categories={categories} key={product?.id} product={product} />
        </div>
    )
}

export default page