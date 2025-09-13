import { BreadcrumbList, Breadcrumbs, BreadcrumbsItem } from "@gmr/components/ui/breadcrumbs";
import { Separator } from "@gmr/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@gmr/components/ui/sidebar";
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@gmr/components/ui/tabs";
import { CirclePlusIcon } from "lucide-solid";

import { GithubMarkdown } from "../github-markdown/github-markdown";
import { MarkdownDesigner } from "../markdown-designer/markdown-designer";
import { WorkbenchProvider } from "./workbench-context";

export function Workbench() {
  return (
    <WorkbenchProvider>
      <SidebarProvider>
        <Sidebar class="border-r-0">
          <SidebarHeader></SidebarHeader>
          <SidebarContent></SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset class="h-svh">
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
          <Tabs class="flex flex-1 overflow-hidden">
            <TabsContent class="flex flex-1 flex-col gap-4 p-4 overflow-auto" value="account">
              <MarkdownDesigner />
            </TabsContent>
            <TabsContent class="flex flex-1 flex-col gap-4 p-4 overflow-auto" value="password">
              <GithubMarkdown />
            </TabsContent>
            <div class="flex justify-end bg-muted/50 py-2.5 px-3 w-full ">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </div>
          </Tabs>
        </SidebarInset>
        <Sidebar class="sticky top-0 hidden h-svh border-l lg:flex" collapsible="none">
          <SidebarHeader class="border-sidebar-border h-16 border-b"></SidebarHeader>
          <SidebarContent>
            <SidebarSeparator class="mx-0" />
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CirclePlusIcon />
                  <span>New Project</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </WorkbenchProvider>
  );
}
