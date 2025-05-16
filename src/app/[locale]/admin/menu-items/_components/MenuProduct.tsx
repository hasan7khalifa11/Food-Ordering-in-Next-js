import Link from "@/components/link/Link";
import { Pages, Routes } from "@/constants/enums";
import { Product } from "@prisma/client";
import { useLocale } from "next-intl";
import Image from "next/image";

const MenuProduct = ({ products }: { products: Product[] }) => {
    const locale = useLocale();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-5 mx-auto">
            {products.map((product) => {
                return (
                    <Link
                        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${product.id}/${Pages.EDIT}`}
                        key={product.id}
                        className="bg-slate-100 mx-auto hover:bg-slate-200 duration-300 rounded-md flex flex-col items-center justify-evenly gap-2 w-[220px] h-[220px]"
                    >
                        <Image
                            alt={product.name}
                            src={product.image}
                            width={150}
                            height={150}
                            className="object-cover"
                        />

                        <div className="text-lg font-semibold">{product.name}</div>
                    </Link>
                );
            })}
        </div>
    );
};

export default MenuProduct;
