import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";


export const getUsers = cache(
    () => {
        const users = db.user.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        })
        return users
    },
    [`users`],
    { revalidate: 3600 }
)

export const getUser = cache(
    (id: string) => {
        const user = db.user.findUnique({
            where: {
                id
            }
        })
        return user
    },
    [`user`],
    { revalidate: 3600 }
)