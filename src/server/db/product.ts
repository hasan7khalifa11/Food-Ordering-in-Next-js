import { cache } from "@/lib/cache"
import { db } from "@/lib/prisma"


export const getBestSellers = cache(
    (limit?: number | undefined) => {
        const bestSellers = db.product.findMany({
            // where: {
            //     orders: {
            //         some: {}
            //     }
            // },
            // orderBy: {
            //     orders: {
            //         _count: "desc"
            //     }
            // },
            include: {
                sizes: true,
                extras: true
            },
            take: limit
        })
        return bestSellers
    },
    ['best-sellers'],
    { revalidate: 3600 }
)

export const getProductByCategory = cache(
    (limit?: number | undefined) => {
        const productByCategory = db.category.findMany({
            include: {
                product: {
                    take: limit,
                    include: {
                        sizes: true,
                        extras: true
                    }
                }
            },

        })
        return productByCategory
    },
    ['best-sellers'],
    { revalidate: 3600 }
)


export const getProducts = cache(
    () => {
        const Products = db.product.findMany({
            orderBy: {
                order: "asc"
            }
        })
        return Products
    },
    ['Products'],
    { revalidate: 3600 }
)

export const getProduct = cache(
    (id: string) => {
        const Product = db.product.findFirst({
            where: {
                id
            },
            include: {
                sizes: true,
                extras: true
            }
        })
        return Product
    },
    ['Product'],
    { revalidate: 3600 }
)