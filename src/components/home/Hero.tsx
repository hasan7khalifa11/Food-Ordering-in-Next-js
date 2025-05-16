import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from '../link/Link'
import { Button, buttonVariants } from '../ui/button'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
// import { getCurrentLocale } from '@/lib/getCurrentLocale'
// import { getDictionary } from '@/lib/dictionaries'

const Hero = () => {

    // const locale = await getCurrentLocale()

    // const { home } = await getDictionary(locale)
    // const { hero } = homeh
    const home = useTranslations('home')

    const locale = useLocale()


    return (
        <div className="my-8 md:my-16">
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 ">

                    <div className="w-11/12 sm:w-3/4 md:w-full text-center mx-auto md:py-12 space-y-6">
                        <div className='text-4xl lg:text-5xl font-bold'>
                            {home('hero.title')}
                        </div>
                        <p className='text-gray-500'>
                            {home('hero.description')}
                        </p>
                        <div className="flex flex-col justify-center sm:flex-row gap-4 mt-6">
                            <Link href={`/${locale}/menu`} className={`${buttonVariants({ size: 'lg' })} font-semibold mx-auto sm:mx-0`}>
                                {home('hero.orderNow')} {locale === 'en' ? <ArrowRight /> : <ArrowLeft />}
                            </Link>
                            <Button variant={'outline'} size={'lg'} className="mx-auto sm:mx-0">
                                {home('hero.learnMore')} {locale === 'en' ? <ArrowRight /> : <ArrowLeft />}
                            </Button>
                        </div>
                    </div>

                    <div className="relative hidden  md:flex justify-center items-center ">
                        <Image
                            src={'/assets/images/pizza.png'}
                            alt="Pizza"
                            width={240}
                            height={240}
                            loading='eager'
                            priority
                            className='object-contain'
                        />
                    </div>
                </div>
            </MaxWidthWrapper >
        </div>
    )
}

export default Hero