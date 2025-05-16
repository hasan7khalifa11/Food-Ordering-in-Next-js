import { InputTypes } from '@/constants/enums'
import { IFormField } from '@/type/app'
import React from 'react'
import TextField from './TextField'
import PasswordField from './PasswordField'
import { validationError } from '@/validations/auth'

interface Props extends IFormField {
    error: validationError
}

const FormField = (props: Props) => {

    const { type } = props

    const renderField = (): React.ReactNode => {
        if (type === InputTypes.TEXT || type === InputTypes.EMAIL) {
            return <TextField {...props} />
        }
        if (type === InputTypes.PASSWORD) {
            return <PasswordField {...props} />
        }
        return <TextField {...props} />
    }

    return (
        <>{renderField()}</>
    )
}

export default FormField