import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { useTranslations } from 'next-intl'

const Footer = () => {

    const footer = useTranslations('')

    return (
        <div className='bg-gray-100 border-t border-gray-200 h-20 flex items-center justify-center'>
            <MaxWidthWrapper>
                <div className='text-center'>
                    {footer('copyRight')}
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Footer