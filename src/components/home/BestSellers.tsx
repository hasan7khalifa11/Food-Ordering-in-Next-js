import React from 'react'
import MainHeading from '../MainHeading'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Menu from '../Menu/Menu'
import { getBestSellers } from '@/server/db/product'
import { getTranslations } from 'next-intl/server'

const BestSellers = async () => {


    const bestSellers = await getBestSellers()

    const home = await getTranslations('home')

    return (
        <div className='my-8 md:my-16'>
            <MaxWidthWrapper>
                <div className='text-center mb-5'>
                    <MainHeading title={home('bestSeller.OurBestSellers')} subTitle={home('bestSeller.checkOut')} />
                </div>
                <Menu items={bestSellers} />
            </MaxWidthWrapper>
        </div>
    )
}

export default BestSellers