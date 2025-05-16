"use client"
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { Button } from '../ui/button';
import { Languages } from '@/constants/enums';

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { locale } = useParams();

    const switchLanguage = (newLocale: string) => {
        const path =
            pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
        router.push(path);
    };

    return (
        <div className="flex ">
            {locale === Languages.ARABIC ? (
                <Button
                    variant="outline"
                    onClick={() => switchLanguage(Languages.ENGLISH)}
                    className='font-semibold'
                >
                    English
                </Button>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => switchLanguage(Languages.ARABIC)}
                    className='font-semibold '
                >
                    العربية
                </Button>
            )}
        </div>
    );
};

export default LanguageSwitcher