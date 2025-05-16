import Link from '@/components/link/Link'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { Pages, Routes } from '@/constants/enums'
import React from 'react'
import Form from './_components/Form'
// import { useTranslations } from 'next-intl'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

const LoginPage = async () => {

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
                    <h2 className='text-2xl font-semibold w-full text-black p-2'>
                        {auth('login.title')}
                    </h2>
                    <Form />
                    <div className='mt-2 element-center text-gray-500 text-sm gap-3'>
                        <span>{auth('login.authPrompt.message')}</span>
                        <Link
                            href={`/${Routes.AUTH}/${Pages.Register}`}
                            className={`${buttonVariants({ variant: 'link', size: 'sm' })} !text-black`}
                        >
                            {auth('login.authPrompt.signUpLinkText')}
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default LoginPage