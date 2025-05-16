"use client"

import { Button } from "@/components/ui/button"
import { Category } from "@prisma/client"
import { Trash2 } from "lucide-react"
import { DeleteCategory } from "../_actions/category"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import LoadingComponent from "@/components/LoadingComponent"



const DeleteCategoryButton = ({ category }: { category: Category }) => {

    const id = category.id
    const locale = useLocale()

    const [state, setState] = useState({
        isLoading: false,
        message: '',
        status: 0
    })


    const handleDeleteCategory = async () => {

        setState((prev) => ({ ...prev, isLoading: true }))
        try {
            const res = await DeleteCategory(id, locale)
            setState(() => ({ message: res.message, status: res.status, isLoading: false }))
        } catch (error) {
            console.log(error)
        } finally {
            setState((prev) => ({ ...prev, isLoading: false }))
        }
    }

    useEffect(() => {
        if (state?.message && state.status && !state.isLoading) {
            toast({
                title: state.message,
                className: state.status === 200 ? 'text-green-400' : 'text-destructive'
            })
        }
    }, [state.isLoading, state.message, state.status])

    return (
        <Button
            variant={"outline"}
            size={"icon"}
            onClick={handleDeleteCategory}
        >

            {state.isLoading ? <LoadingComponent /> : <Trash2 />}
        </Button>
    )
}

export default DeleteCategoryButton