import { IFormField } from '@/type/app'
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { validationError } from '@/validations/auth'

interface TextProps extends IFormField {
    error: validationError
}

const TextField = ({
    error,
    name,
    type,
    autoFocus,
    defaultValue,
    disabled,
    id,
    label,
    placeholder,
    readOnly
}: TextProps) => {
    return (
        <div className='mb-4'>
            <Label htmlFor={name} className='mb-1' >
                {label}
            </Label>
            <Input
                type={type}
                name={name}
                id={id}
                defaultValue={defaultValue}
                autoFocus={autoFocus}
                disabled={disabled}
                placeholder={placeholder}
                readOnly={readOnly}
                className='mt-1'
            />
            {error && error[name] && (
                <p
                    className={`text-accent mt-2 text-sm font-medium ${error[name] ? "text-destructive" : ""
                        }`}
                >
                    {error[name]}
                </p>
            )}
        </div>
    )
}

export default TextField