import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import NavItems from './NavItems'
import { Routes } from '@/constants/enums'
import Link from '../link/Link'
import { getLocale, getTranslations } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'

const Navbar = async () => {
    const logo = getTranslations()

    const navbar = getTranslations('navbar')

    const menu = (await navbar)('menu')
    const about = (await navbar)('about')
    const contact = (await navbar)('contact')
    const admin = (await navbar)('admin')
    const profile = (await navbar)('profile')
    const login = (await navbar)('login')
    const register = (await navbar)('register')
    const signout = (await navbar)('signOut')

    const locale = getLocale()

    const initialSession = await getServerSession(authOptions)
    return (
        <div className='h-16 sticky z-50 top-0 inset-0 bg-background'>
            <MaxWidthWrapper >
                <div className='flex items-center h-16 border-b border-border'>
                    <div className='ml-4 lg:ml-0 text-3xl font-bold'>
                        <Link href={Routes.ROOT} className='text-primary'>🍕 {(await logo)('logo')}</Link>
                    </div>
                    <div className={await locale === 'en' ? 'mr-4 lg:mr-0 ml-auto' : 'ml-4 lg:ml-0 mr-auto'}>
                        <NavItems
                            menu={menu}
                            about={about}
                            contact={contact}
                            admin={admin}
                            profile={profile}
                            login={login}
                            register={register}
                            signout={signout}
                            initialSession={initialSession}
                        />
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Navbar