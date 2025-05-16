import EditUserForm from '@/components/profile/EditUserForm'
import { Pages, Routes } from '@/constants/enums'
import { getUser, getUsers } from '@/server/db/user'
import { getLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'
import React from 'react'

export async function generateStaticParams() {
    const users = await getUsers()

    return users.map(user => ({ userId: user.id }))
}

interface UserIdProps {
    params: Promise<{ userId: string }>
}

const EditUserPage = async ({ params }: UserIdProps) => {

    const { userId } = await params
    const locale = await getLocale()

    const user = await getUser(userId)

    if (!user) {
        redirect(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`)
    }

    return (
        <div>
            <EditUserForm user={user} />
        </div>
    )
}

export default EditUserPage