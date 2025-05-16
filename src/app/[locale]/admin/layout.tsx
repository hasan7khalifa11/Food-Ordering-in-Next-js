import React from 'react'
import AdminTabs from './_components/AdminTabs'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

const layout = ({ children }: {
    children: React.ReactNode,
}) => {

    return (
        <div>
            <MaxWidthWrapper>
                <AdminTabs />
                {children}
            </MaxWidthWrapper>
        </div>
    )
}

export default layout