"use client"
import LoadingComponent from '@/components/LoadingComponent'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { userDelete } from '../_action/User'
import { useLocale } from 'use-intl'
import { toast } from '@/hooks/use-toast'

interface UserDeleteProps {
    id: string
}
const UserDelete = ({ id }: UserDeleteProps) => {

    const locale = useLocale()
    const [state, setState] = useState({
        pending: false,
        message: '',
        status: 0
    })

    const handleUserDelete = async () => {
        setState((prev) => ({ ...prev, pending: true }))
        try {
            const res = await userDelete(id, locale)
            setState((prev) => ({ ...prev, message: res.message, status: res.status }))
        } catch (error) {
            console.log(error)
        } finally {
            setState((prev) => ({ ...prev, pending: false }))
        }
    }
    useEffect(() => {
        if (state?.message && state.status && !state.pending) {
            toast({
                title: state.message,
                className: state.status === 200 ? 'text-green-400' : 'text-destructive'
            })
        }
    }, [state.pending, state.message, state.status])

    return (
        <Button size={'icon'} variant={'default'} type='button' onClick={handleUserDelete} disabled={state.pending}>
            {state.pending ? <LoadingComponent /> : <Trash2Icon />}
        </Button>
    )
}

export default UserDelete