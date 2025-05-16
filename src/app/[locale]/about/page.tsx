import MainHeading from '@/components/MainHeading'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Routes } from '@/constants/enums'
import { useTranslations } from 'next-intl'
import React from 'react'

const AboutPage = () => {

    const home = useTranslations('home')

    return (
        <section className='my-8 md:my-16' id={Routes.ABOUT}>
            <MaxWidthWrapper>
                <div className='text-center mb-5'>
                    <MainHeading subTitle={home('about.ourStory')} title={home('about.aboutUs')} />
                </div>
                <div className='text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4 text-center'>
                    <p>{home('about.descriptions.one')}</p>
                    <p>{home('about.descriptions.two')}</p>
                    <p>{home('about.descriptions.three')}</p>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}

export default AboutPage