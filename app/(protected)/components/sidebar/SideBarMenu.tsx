"use client";

import { useState } from "react";
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { sideBarData } from "./data-access/sideBar.data";
import { AvatarImage } from "@/components/ui/avatar";

const SideBarMenu = () => {
  const [activeTeam] = useState(sideBarData.empresa);
  return (
    <SidebarMenu>
      <SidebarMenuButton size="lg">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
          {/* <activeTeam.logo className="size-9" /> */}
          {/* <AvatarImage src="https://i.pinimg.com/736x/7a/1e/a5/7a1ea541deca5d76eae29322808db061.jpg" alt="wadaf" /> */}
          <img src="logoepis.png" alt="" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{activeTeam.name}</span>
          <span className="truncate text-xs">{activeTeam.plan}</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenu>
  );
};
export default SideBarMenu;
