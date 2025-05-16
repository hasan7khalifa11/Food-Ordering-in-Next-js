"use client"
import FormField from '@/components/form-field/FormField'
import useFormField from '@/hooks/useFormField'
import { Button } from '@/components/ui/button'
import { Pages, Routes } from '@/constants/enums'
import React, { useRef, useState } from 'react'
import { signIn, } from 'next-auth/react'
import { toast } from '@/hooks/use-toast'
import LoadingComponent from '@/components/LoadingComponent'
import { useTranslations } from 'use-intl'
import { useRouter } from 'next/navigation'

const Form = () => {

    const router = useRouter()

    const formRef = useRef<HTMLFormElement>(null)
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)

    const message = useTranslations('messages')
    const auth = useTranslations('auth')

    const { getFormFields } = useFormField({
        slug: Pages.LOGIN,
    })

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formRef.current) return;
        // console.log(formRef.current)
        const formData = new FormData(formRef.current)
        const data: Record<string, string> = {}

        formData.forEach((value, key) => {
            data[key] = value.toString()
        })


        try {
            setLoading(true)
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            })
            setLoading(false)
            if (res?.error) {
                const validationError = JSON.parse(res?.error).validationError
                setError(validationError)
                const responseError = JSON.parse(res?.error).responseError
                console.log(responseError)
                if (responseError) {
                    toast({
                        title: responseError,
                        className: 'text-destructive'
                    })
                }
            }
            if (res?.ok) {
                toast({
                    title: message('loginSuccessful'),
                    className: 'text-green-400'
                })
                router.replace(`/${Routes.PROFILE}`)
            }

        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} ref={formRef} className='w-full p-5'>
            {getFormFields().map(field => (
                <FormField {...field} key={field.name} error={error} />
            ))}
            <Button type='submit' disabled={loading ? true : false} className='w-full mt-3'>
                {loading ? <LoadingComponent /> : auth('login.submit')}
            </Button>
        </form>
    )
}

export default Form