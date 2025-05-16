import EditUserForm from "@/components/profile/EditUserForm";
import { Pages, Routes } from "@/constants/enums";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

const AdminPage = async () => {
    // const profile = getTranslations('profile')

    const session = await getServerSession(authOptions);
    const locale = getLocale();
    if (!session) {
        redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }

    return (
        <main className="my-8 md:my-16" id={Routes.ADMIN}>
            <EditUserForm user={session?.user} />
        </main>
    );
};

export default AdminPage;
