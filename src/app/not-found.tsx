// import Link from 'next/link'
import Link from '@/components/link/Link'
import { Button } from '@/components/ui/button'
import React from 'react'

const NotFoundPage = () => {
    return (
        <html>
            <body>
                <section className='text-center p-4 flex flex-col items-center justify-center gap-6'>
                    <div className={`font-bold mt-20 text-primary text-6xl`}>Oops!</div>
                    <div className='text-xl font-bold'>404 - Page Not Found</div>
                    <p className='text-sm w-80 font-semibold text-gray-600'>The page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
                    <Button variant={'default'} size={'lg'}><Link href={'/'}>Go To Home Page</Link></Button>
                </section>
            </body>
        </html>

    )
}

export default NotFoundPage