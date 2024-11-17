import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SideBarItems from "./SideBarItems";
import SideBarMenu from "./SideBarMenu";
import SideBarFooter from "./SideNarFooter";
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader>
        <SideBarMenu />
      </SidebarHeader>
      <SidebarContent>
        <SideBarItems />
      </SidebarContent>
      <SideBarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
