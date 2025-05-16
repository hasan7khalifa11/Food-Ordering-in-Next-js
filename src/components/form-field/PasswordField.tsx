/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFormField } from '@/type/app'
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface PasswordProps extends IFormField {
    error: any
}

const PasswordField = ({
    error,
    name,
    type,
    autoFocus,
    defaultValue,
    disabled,
    id,
    label,
    placeholder,
}: PasswordProps) => {
    return (
        <div className='mb-4'>
            <Label htmlFor={name} className='mb-1'>
                {label}
            </Label>
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                id={id}
                autoFocus={autoFocus}
                defaultValue={defaultValue}
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

export default PasswordField