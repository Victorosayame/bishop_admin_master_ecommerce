import LeftSideBar from "@/components/leftsidebar";
import TopBar from "@/components/topbar";
import { ClerkProvider } from "@clerk/nextjs";


export default async function DashboardLayout({
    children, params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
  
    return (
        <>
        <ClerkProvider afterSignOutUrl="/sign-in">
        <div className="flex max-lg:flex-col text-grey-1">
        <LeftSideBar />
        <TopBar />
        <div className="flex-1">
         {children}
        </div>
         </div>
         </ClerkProvider>
        </>
    )
}