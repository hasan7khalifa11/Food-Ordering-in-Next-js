"use client"

import { Pages, Routes } from "@/constants/enums"
import Link from "../link/Link"
import { Button, buttonVariants } from "../ui/button"
import { Separator } from "@radix-ui/react-separator";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useClientSession } from "@/hooks/useClientSession";

interface AuthProps {
    login: string;
    register: string;
    signout: string;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
    initialSession: Session | null
}

const AuthItems = ({ login, register, signout, setOpenMenu, initialSession }: AuthProps) => {

    const session = useClientSession(initialSession)

    return (
        <div>
            {session.data?.user ? (
                <div>
                    <Button
                        onClick={() => signOut()}
                        className={`${buttonVariants({
                            variant: "default",
                        })} lg:${buttonVariants({ variant: "default", size: "default" })}`}
                    >
                        {signout}
                    </Button>
                </div>
            ) : (
                <div className="flex items-center">
                    <Link
                        href={`/${Routes.AUTH}/${Pages.LOGIN}`}
                        onClick={() => setOpenMenu(false)}
                        className={`${buttonVariants({
                            variant: "default",
                        })} lg:${buttonVariants({ variant: "default", size: "default" })}`}
                    >
                        {login}
                    </Link>
                    <Separator
                        orientation="vertical"
                        className="h-6 hidden md:mx-4 lg:block"
                    />
                    <Link
                        href={`/${Routes.AUTH}/${Pages.Register}`}
                        onClick={() => setOpenMenu(false)}
                        className={`${buttonVariants({
                            variant: "default",
                        })} lg:${buttonVariants({ variant: "default", size: "default" })}`}
                    >
                        {register}
                    </Link>
                </div>
            )}
        </div>
    )
}

export default AuthItems