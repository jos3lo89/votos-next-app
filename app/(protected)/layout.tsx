import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import SideBarHeader from "./components/sidebar/SideBarHeader";

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SideBarHeader />
        <main className="flex flex-1 flex-col gap-4 pt-0 mx-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default ProtectedLayout;
