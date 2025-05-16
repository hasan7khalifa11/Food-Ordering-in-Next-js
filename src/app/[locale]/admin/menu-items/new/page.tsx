import React from 'react'
import Form from '../_components/Form'
import { getCategories } from '@/server/db/category'

const page = async () => {

    const categories = await getCategories()

    return (
        <div className='my-8 md:my-16'>
            <Form categories={categories} />
        </div>
    )
}

export default page