import Link from '@/components/link/Link'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { Pages, Routes } from '@/constants/enums'
import React from 'react'
import Form from './_components/Form'
import { getTranslations } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'
import { redirect } from 'next/navigation'

const RegisterPage = async () => {

    const session = await getServerSession(authOptions)
    // console.log(session)
    if (session) {
        redirect(`/${Routes.ROOT}`)
    }

    const auth = await getTranslations('auth')

    return (
        <div className='bg-gray-50 height-auth element-center'>
            <MaxWidthWrapper className='element-center'>
                <div className='element-center flex-col p-6 bg-white rounded-lg shadow-md w-full max-w-md'>
                    <h2 className='text-2xl font-semibold text-center text-black mb-4'>
                        {auth('register.title')}
                    </h2>
                    <Form />
                    <div className='mt-2 element-center text-gray-500 text-sm gap-3'>
                        <span>{auth('register.authPrompt.message')}</span>
                        <Link
                            href={`/${Routes.AUTH}/${Pages.LOGIN}`}
                            className={`${buttonVariants({ variant: 'link', size: 'sm' })} !text-black !font-semibold`}
                        >
                            {auth('register.authPrompt.loginLinkText')}
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default RegisterPage

