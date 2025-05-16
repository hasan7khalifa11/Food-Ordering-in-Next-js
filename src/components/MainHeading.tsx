import React from 'react'

interface MainHeadingProps {
    title: string,
    subTitle: string
}
const MainHeading = ({ title, subTitle }: MainHeadingProps) => {
    return (
        <div>
            <div className='uppercase text-gray-500 font-semibold leading-4'>
                {subTitle}
            </div>
            <div className='italic text-primary text-4xl font-bold'>
                {title}
            </div>
        </div>
    )
}

export default MainHeading