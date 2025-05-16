import Link from "@/components/link/Link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { getUsers } from "@/server/db/user";
import { EditIcon } from "lucide-react";
import { getLocale } from "next-intl/server";
import React from "react";
import UserDelete from "./_components/UserDelete";

const UsersPage = async () => {
    const head = ["Name", "Email", "Created At", "Role", "Actions"];

    const users = await getUsers();

    const locale = await getLocale();

    return (
        <div className="my-10">
            <div className="w-full table shadow  rounded-lg border mb-20">
                <div className="table-header-group">
                    <div className="table-row font-bold">
                        {head.map((item, index) => (
                            <div className="table-cell bg-slate-50" key={index}>
                                <div
                                    className={`m-4 ml-0  ${index === 0 ? `` : `border-l border-l-slate-300`
                                        } pl-4`}
                                >
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="table-row-group text-[15px]">
                    {users.map((user, index) => {
                        console.log(typeof index);
                        return (
                            <div className={`table-row  overflow-hidden `} key={user.id}>
                                <div className="table-cell   p-4 rounded-bl-lg border-t font-semibold">
                                    {user.name}
                                </div>
                                <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                                    {user.email}
                                </div>
                                <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                                    {new Date(user.createdAt).toDateString()}
                                </div>
                                <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                                    {user.role}
                                </div>
                                <div className="table-cell p-4 rounded-br-lg border-t font-semibold">
                                    <div className="flex items-center gap-5">
                                        <Link
                                            href={`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`}
                                            className={`${buttonVariants({
                                                variant: "outline",
                                                size: "icon",
                                            })}`}
                                        >
                                            <EditIcon />
                                        </Link>
                                        <UserDelete id={user.id} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
