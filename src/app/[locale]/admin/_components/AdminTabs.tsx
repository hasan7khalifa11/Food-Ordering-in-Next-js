"use client";
import Link from "@/components/link/Link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const AdminTabs = () => {
    const admin = useTranslations("admin");
    const pathname = usePathname();
    const locale = useLocale();
    const tabs = [
        {
            name: admin("tabs.profile"),
            href: `/${Routes.ADMIN}`,
        },
        {
            name: admin("tabs.categories"),
            href: `/${Routes.ADMIN}/${Pages.CATEGORIES}`,
        },
        {
            name: admin("tabs.menuItems"),
            href: `/${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
        },
        {
            name: admin("tabs.users"),
            href: `/${Routes.ADMIN}/${Pages.USERS}`,
        },
        {
            name: admin("tabs.orders"),
            href: `/${Routes.ADMIN}/${Pages.ORDERS}`,
        },


    ];

    const isActive = (href: string) => {
        const path = href.split("/");
        return path.length > 2
            ? pathname.startsWith(`/${locale}${href}`)
            : pathname === `/${locale}${href}`;
    };

    return (
        <div className="">
            <MaxWidthWrapper className="flex justify-center">
                {/* <div className="flex items-center justify-center gap-4 p-4 mt-10"> */}
                <div className="mt-10 p-4 flex items-center flex-wrap justify-center gap-4 ">
                    {tabs.map((tab, index) => {
                        return (
                            <div key={index} className="text-center">
                                <Link
                                    href={tab.href}
                                    className={`${isActive(tab.href)
                                        ? buttonVariants({ variant: "default" })
                                        : buttonVariants({ variant: "outline" })
                                        }`}
                                >
                                    {tab.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default AdminTabs;
