import MainHeading from '@/components/MainHeading'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Routes } from '@/constants/enums'
import { useTranslations } from 'next-intl'
import React from 'react'

const ContactPage = () => {

    const contact = useTranslations('home')

    return (
        <section className='my-8 md:my-16' id={Routes.CONTACT}>
            <MaxWidthWrapper className='text-center'>
                <div className=' mb-5'>
                    <MainHeading subTitle={contact("contact.Don'tHesitate")} title={contact("contact.contactUs")} />
                </div>
                <a className='text-4xl underline text-gray-700' href='tel:+963997931652'>+963997931652</a>
            </MaxWidthWrapper>
        </section>
    )
}

export default ContactPage