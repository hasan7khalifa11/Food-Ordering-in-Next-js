import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "@/components/link/Link";
import { Pages, Routes } from "@/constants/enums";
import { getLocale, getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MenuProduct from "./_components/MenuProduct";
import { getProducts } from "@/server/db/product";

const MenuItemsPage = async () => {
    const products = await getProducts();

    const admin = getTranslations("admin");
    const locale = getLocale()

    return (
        <div>
            <MaxWidthWrapper className="text-center">
                <Link
                    className={`${buttonVariants({ variant: "secondary", size: "lg" })} my-5 !font-semibold !text-base`}
                    href={`/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${Pages.NEW}`}
                >
                    {(await admin)("menu-items.createNewMenuItem")} {await locale === "en" ? <ArrowRight /> : <ArrowLeft />}
                </Link>
                <MenuProduct products={products} />
            </MaxWidthWrapper>
        </div>
    );
};

export default MenuItemsPage;
