import { LayoutDashboardIcon, ListIcon } from "lucide-solid";

import { NavMain, type NavMainGroup } from "@/components/layout/nav-main";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const data: NavMainGroup[] = [
  {
    items: [
      {
        icon: LayoutDashboardIcon,
        title: "Dashboard",
        url: "/",
      },
      {
        icon: ListIcon,
        title: "Lifecycle",
        url: "#",
      },
    ],
  },
  {
    items: [
      {
        items: [
          {
            title: "Form Elements",
            url: "/form/elements",
          },
          {
            title: "Form Layout",
            url: "#",
          },
        ],
        title: "Form",
      },
    ],
    title: "Pages",
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                {/* <IconInnerShadowTop class="!size-5" /> */}
                <span class="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
