"use client"
import FormField from '@/components/form-field/FormField'
import useFormField from '@/hooks/useFormField'
import LoadingComponent from '@/components/LoadingComponent'
import { Button } from '@/components/ui/button'
import { Pages, Routes } from '@/constants/enums'
import { toast } from '@/hooks/use-toast'
import { signUp } from '@/server/_actions/auth'
import { IFormField } from '@/type/app'
import { validationError } from '@/validations/auth'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect } from 'react'
import { useTranslations } from 'use-intl'
import { useLocale } from 'next-intl'

const initialState: {
    message?: string,
    error?: validationError,
    status?: number | null,
    formData?: FormData | null,

} = {
    message: '',
    error: {},
    status: null,
    formData: null,
}

const Form = () => {

    const locale = useLocale()

    const router = useRouter()
    const [state, action, pending] = useActionState(signUp.bind(null, locale), initialState)

    const auth = useTranslations('auth')

    const { getFormFields } = useFormField({
        slug: Pages.Register,
    })

    useEffect(() => {
        if (state.status && state.message) {
            toast({
                title: state.message,
                className: state.status === 201 ? 'text-green-400' : 'text-destructive'
            })
        }
        if (state.status === 201) router.replace(`/${Routes.AUTH}/${Pages.LOGIN}`)
    }, [router, state.message, state.status])




    return (
        <form className='w-full p-5' action={action}>
            {getFormFields().map((field: IFormField) => {
                const fieldValue = state.formData?.get(field.name) as string
                return (
                    <div key={field.name}>
                        <FormField {...field} error={state.error} defaultValue={fieldValue} />
                    </div>
                )
            })}
            <Button type='submit' disabled={pending} className='w-full mt-3'>
                {pending ? <LoadingComponent /> : auth('register.submit')}
            </Button>
        </form>
    )
}

export default Form