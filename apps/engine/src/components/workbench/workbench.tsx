import { BreadcrumbList, Breadcrumbs, BreadcrumbsItem } from "@gmr/components/ui/breadcrumbs";
import { Separator } from "@gmr/components/ui/separator";
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from "@gmr/components/ui/sidebar";

export function Workbench() {
  return (
    <SidebarProvider>
      <Sidebar class="border-r-0">
        <SidebarHeader></SidebarHeader>
        <SidebarContent></SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header class="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
          <div class="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator class="mr-2 data-[orientation=vertical]:h-4" orientation="vertical" />
            <Breadcrumbs>
              <BreadcrumbList>
                <BreadcrumbsItem class="line-clamp-1">Project Management & Task Tracking</BreadcrumbsItem>
              </BreadcrumbList>
            </Breadcrumbs>
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
          <div class="bg-muted/50 mx-auto h-[100vh] w-full max-w-3xl rounded-xl" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
