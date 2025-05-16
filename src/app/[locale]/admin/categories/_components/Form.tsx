"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { validationError } from '@/validations/auth'
import React, { useActionState, useEffect } from 'react'
import { createCatecory } from '../_actions/category'
import { Button } from '@/components/ui/button'
import { useLocale, useTranslations } from 'next-intl'
import LoadingComponent from '@/components/LoadingComponent'
import { toast } from '@/hooks/use-toast'



const initialState: {
    message?: string,
    error?: validationError,
    status?: number | null,

} = {
    message: '',
    error: {},
    status: null,
}
const Form = () => {
    const admin = useTranslations('admin')
    const save = useTranslations('')
    const locale = useLocale()
    const [state, action, pending] = useActionState(createCatecory.bind(null, locale), initialState)

    useEffect(() => {
        if (state?.message && state.status && !pending) {
            toast({
                title: state.message,
                className: state.status === 201 ? 'text-green-400' : 'text-destructive'
            })
        }
    }, [pending, state?.message, state?.status])
    return (
        <form action={action} className='max-w-[500px] mx-auto'>
            <div className='mb-4'>
                <Label htmlFor='category' className='mb-1' >
                    {admin('categories.form.name.label')}
                </Label>
                <div className='flex items-center gap-5'>
                    <Input
                        type='text'
                        name='category'
                        id='category'
                        autoFocus={true}
                        placeholder={admin('categories.form.name.placeholder')}
                        className='mt-1'
                    />
                    <Button type='submit' className='mt-1'>
                        {pending ? <LoadingComponent /> : save('create')}
                    </Button>
                </div>
                {state?.error && state.error['category'] && (
                    <p
                        className={`text-accent mt-2 text-sm font-medium ${state.error['category'] ? "text-destructive" : ""
                            }`}
                    >
                        {state.error['category']}
                    </p>
                )}
            </div>

        </form>
    )
}

export default Form