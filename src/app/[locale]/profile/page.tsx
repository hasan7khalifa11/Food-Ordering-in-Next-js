import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import EditUserForm from "@/components/profile/EditUserForm";
import { Pages, Routes } from "@/constants/enums";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const profile = getTranslations("profile");

    const session = await getServerSession(authOptions);
    const locale = getLocale();
    if (!session) {
        redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }

    return (
        <main className="my-8 md:my-16" id={Routes.PROFILE}>
            <MaxWidthWrapper>
                <h1 className="text-primary text-center font-bold text-4xl mb-5">
                    {(await profile)("title")}
                </h1>
                <EditUserForm user={session?.user} />
            </MaxWidthWrapper>
        </main>
    );
};

export default ProfilePage;
