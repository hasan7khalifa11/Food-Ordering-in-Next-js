import LoadingComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { UpdateCategory } from "../_actions/category";
import { validationError } from "@/validations/auth";
import { toast } from "@/hooks/use-toast";
import { Category } from "@prisma/client";

const initialState: {
    message?: string,
    error?: validationError,
    status?: number | null,

} = {
    message: '',
    error: {},
    status: null,
}

const EditIcon = ({ category }: { category: Category }) => {
    const admin = useTranslations("admin");
    const save = useTranslations("");
    const locale = useLocale()

    const id = category.id
    const [state, action, pending] = useActionState(UpdateCategory.bind(null, { id, locale }), initialState)

    useEffect(() => {
        if (state?.message && state.status && !pending) {
            toast({
                title: state.message,
                className: state.status === 200 ? 'text-green-400' : 'text-destructive'
            })
        }
    }, [pending, state?.message, state?.status])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size={"icon"}>
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-5/6 rounded-md sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={`${locale === 'en' ? 'text-left' : 'text-right'}`}>{admin("categories.form.editName")}</DialogTitle>
                </DialogHeader>
                <form action={action}>
                    <Label htmlFor='updateCategory' className='mb-1' >
                        {admin('categories.form.name.label')}
                    </Label>
                    <Input
                        type='text'
                        name='updateCategory'
                        id='updateCategory'
                        autoFocus={true}
                        defaultValue={category.name}
                        placeholder={admin('categories.form.name.placeholder')}
                        className='mt-1'
                    />
                    {state?.error && state.error['updateCategory'] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state.error['updateCategory'] ? "text-destructive" : ""
                                }`}
                        >
                            {state.error['updateCategory']}
                        </p>
                    )}
                    <DialogFooter>
                        <Button type='submit' className='mt-1' size={"default"}>
                            {pending ? <LoadingComponent /> : save('save')}
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
};

export default EditIcon;
