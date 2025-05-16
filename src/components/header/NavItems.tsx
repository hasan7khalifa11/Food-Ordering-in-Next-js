"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Menu, XIcon } from "lucide-react";
import CartButton from "./CartButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "next-intl";
import AuthItems from "./AuthItems";
import { Session } from "next-auth";
import { useClientSession } from "@/hooks/useClientSession";
import { Routes } from "@/constants/enums";

interface navItemProps {
    menu: string;
    about: string;
    contact: string;
    admin: string;
    profile: string;
    login: string;
    register: string;
    signout: string;
    initialSession: Session | null;
}

const NavItems = ({
    menu,
    about,
    contact,
    admin,
    profile,
    login,
    register,
    signout,
    initialSession,
}: navItemProps) => {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);

    const locale = useLocale();

    const Items = [
        { name: menu, href: `/${locale}/menu` },
        { name: about, href: `/${locale}/about` },
        { name: contact, href: `/${locale}/contact` },
    ];

    const session = useClientSession(initialSession);

    return (
        <div className="flex items-center">
            <div
                className={`duration-1000 w-full absolute top-16 space-y-12 py-8 px-16  md:py-10 md:px-20  bg-gray-50 text-lg 
                    ${openMenu
                        ? `inset-x-0 ${locale === 'ar' ? `left-full slide-in-from-left-1/2` : `right-full slide-in-from-right-1/2`} animate-in duration-700 fade-in-10`
                        : " hidden"
                    }
                lg:relative lg:left-0 lg:top-0 lg:ml-auto lg:flex lg:items-center lg:space-y-0 lg:p-0 lg:text-base lg:bg-background`}
            >
                <div
                    className={`lg:flex lg:items-center space-y-8 lg:space-y-0 
                    ${locale === "en"
                            ? "lg:mr-12 xl:mr-40"
                            : "lg:ml-12 xl:ml-40"
                        }`}
                >
                    {Items.map((item, index) => {
                        return (
                            <div key={index} className="flex items-center">
                                <Link
                                    onClick={() => setOpenMenu(false)}
                                    href={item.href}
                                    className={`relative hover:text-primary duration-300 transition-colors 
                                    ${item.href === pathname
                                            ? "text-primary font-bold"
                                            : "font-semibold"
                                        }
                                    p-3 border-b rounded-xl w-full hover:bg-secondary lg:hover:bg-background
                                    lg:p-0 lg:border-none`}
                                >
                                    {item.name}
                                </Link>
                                {index < Items.length - 1 && (
                                    <Separator
                                        orientation="vertical"
                                        className="h-6 hidden mx-6 lg:block"
                                    />
                                )}
                            </div>
                        );
                    })}
                    {session.data?.user && (
                        <div className="flex items-center">
                            <Separator
                                orientation="vertical"
                                className="h-6 hidden mx-6 lg:block"
                            />
                            <Link
                                onClick={() => setOpenMenu(false)}
                                href={
                                    session.data?.user.role === "ADMIN"
                                        ? `/${Routes.ADMIN}`
                                        : `/${Routes.PROFILE}`
                                }
                                className={`${pathname.startsWith(
                                    `/${locale}/${Routes.ADMIN}` ||
                                    `/${locale}/${Routes.PROFILE}`
                                )
                                    ? "text-primary font-bold"
                                    : "font-semibold"
                                    } relative hover:text-primary duration-300 transition-colors p-3 border-b rounded-xl w-full hover:bg-secondary lg:hover:bg-background
                                    lg:p-0 lg:border-none`}
                            >
                                {session.data?.user.role === "ADMIN" ? admin : profile}
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex items-center">
                    {
                        <AuthItems
                            login={login}
                            register={register}
                            signout={signout}
                            initialSession={initialSession}
                            setOpenMenu={setOpenMenu}
                        />
                    }
                </div>
            </div>
            <Button
                variant={"secondary"}
                size={"icon"}
                className="relative lg:hidden z-10 mx-2"
                onClick={() => setOpenMenu((perv) => !perv)}
            >
                {openMenu ? <XIcon /> : <Menu />}
            </Button>

            <div className="flex items-center ">
                <Separator
                    orientation="vertical"
                    className="h-6 hidden md:mx-4 lg:block"
                />
                <LanguageSwitcher />
                <CartButton />
            </div>
        </div>
    );
};

export default NavItems;
