
import { Pages, Routes } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/type/app";
import { useTranslations } from "next-intl";

// interface FormFieldProps extends IFormFieldsVariables 

const useFormField = ({ slug }: IFormFieldsVariables) => {
    const auth = useTranslations('auth')
    const profile = useTranslations('profile')
    const admin = useTranslations('admin')
    const loginForm = (): IFormField[] => [
        {
            name: 'email',
            type: 'email',
            label: auth('login.email.label'),
            placeholder: auth('login.email.placeholder'),
            autoFocus: true
        },
        {
            name: 'password',
            type: 'password',
            label: auth('login.password.label'),
            placeholder: auth('login.password.placeholder'),
        }
    ]

    const registerForm = (): IFormField[] => [
        {
            name: 'name',
            type: 'text',
            label: auth('register.name.label'),
            placeholder: auth('register.name.placeholder'),
            autoFocus: true
        },
        {
            name: 'email',
            type: 'email',
            label: auth('register.email.label'),
            placeholder: auth('register.email.placeholder'),

        },
        {
            name: 'password',
            type: 'password',
            label: auth('register.password.label'),
            placeholder: auth('register.password.placeholder'),
        },
        {
            name: 'confirmPassword',
            type: 'password',
            label: auth('register.confirmPassword.label'),
            placeholder: auth('register.confirmPassword.placeholder'),
        },
    ]

    const editUserForm = (): IFormField[] => [
        {
            name: 'name',
            type: 'text',
            label: profile('form.name.label'),
            placeholder: profile('form.name.placeholder'),
            autoFocus: true
        },
        {
            name: 'email',
            type: 'text',
            label: profile('form.email.label'),
            placeholder: profile('form.email.placeholder'),
        },
        {
            name: 'phone',
            type: 'text',
            label: profile('form.phone.label'),
            placeholder: profile('form.phone.placeholder'),
        },
        {
            name: 'streetAddress',
            type: 'text',
            label: profile('form.address.label'),
            placeholder: profile('form.address.placeholder'),
        },
        {
            name: 'postalCode',
            type: 'text',
            label: profile('form.postalCode.label'),
            placeholder: profile('form.postalCode.placeholder'),
        },
        {
            name: 'city',
            type: 'text',
            label: profile('form.city.label'),
            placeholder: profile('form.city.placeholder'),
        },
        {
            name: 'country',
            type: 'text',
            label: profile('form.country.label'),
            placeholder: profile('form.country.placeholder'),
        },
    ]

    const addProductForm = (): IFormField[] => [
        {
            name: 'name',
            type: 'text',
            label: admin('menu-items.form.name.label'),
            placeholder: admin('menu-items.form.name.placeholder'),
            autoFocus: true
        },
        {
            name: 'description',
            type: 'text',
            label: admin('menu-items.form.description.label'),
            placeholder: admin('menu-items.form.description.placeholder'),
        },
        {
            name: 'basePrice',
            type: 'text',
            label: admin('menu-items.form.basePrice.label'),
            placeholder: admin('menu-items.form.basePrice.placeholder'),
        },
    ]

    const getFormFields = (): IFormField[] => {
        switch (slug) {
            case Pages.LOGIN:
                return loginForm()
            case Pages.Register:
                return registerForm()
            case Routes.PROFILE:
                return editUserForm()
            case Pages.NEW:
                return addProductForm()
            default:
                return []
        }
    }

    return {
        getFormFields
    }
}

export default useFormField 