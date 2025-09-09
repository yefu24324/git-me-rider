import { useCollapsibleContext } from "@kobalte/core/collapsible";
import { ChevronRightIcon, CirclePlusIcon, MailIcon } from "lucide-solid";
import { type Accessor, type Component, For, Show } from "solid-js";
import { Motion } from "solid-motion";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, type CollapsibleTriggerProps } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export interface NavMainGroup {
  title?: string | Accessor<string>;
  items: Array<NavMainItem | NavMainSub>;
}

export interface NavMainItem {
  title: string | Accessor<string>;
  icon?: Component;
  url: string;
}

export interface NavMainSub {
  title: string | Accessor<string>;
  icon?: Component;
  items: NavMainSubItem[];
}

export interface NavMainSubItem {
  title: string | Accessor<string>;
  icon?: Component;
  url: string;
}

function unAccessor(text: string | Accessor<string>) {
  return typeof text === "string" ? text : text();
}
function isMenuSub(item: NavMainItem | NavMainSub): item is NavMainSub {
  return Array.isArray((item as { items: NavMainItem[] }).items);
}

export function NavMain(props: { items: NavMainGroup[] }) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent class="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem class="flex items-center gap-2">
              <SidebarMenuButton
                class="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                tooltip="Quick Create"
              >
                <CirclePlusIcon />
                <span>Quick Create</span>
              </SidebarMenuButton>
              <Button class="size-8 group-data-[collapsible=icon]:opacity-0" size="icon" variant="outline">
                <MailIcon />
                <span class="sr-only">Inbox</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <For each={props.items}>
        {(menuGroup) => {
          return (
            <SidebarGroup>
              {menuGroup.title && <SidebarGroupLabel>{unAccessor(menuGroup.title)}</SidebarGroupLabel>}
              <SidebarMenu>
                <For each={menuGroup.items}>
                  {(item) => {
                    if (isMenuSub(item)) {
                      return (
                        <Collapsible class="group/collapsible">
                          <SidebarMenuItem>
                            <CollapsibleTrigger
                              as={(props: CollapsibleTriggerProps) => {
                                const context = useCollapsibleContext();
                                return (
                                  <SidebarMenuButton tooltip={item.title} {...props}>
                                    {item.icon && <item.icon />}
                                    <span>{unAccessor(item.title)}</span>
                                    <Motion
                                      animate={{ rotate: context.isOpen() ? 90 : 0 }}
                                      class="ml-auto"
                                      transition={{ damping: 22, stiffness: 150, type: "spring" }}
                                    >
                                      <ChevronRightIcon class="size-4" />
                                    </Motion>
                                  </SidebarMenuButton>
                                );
                              }}
                            ></CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <For each={item.items}>
                                  {(subItem) => (
                                    <SidebarMenuSubItem>
                                      <SidebarMenuSubButton href={subItem.url}>
                                        <span>{unAccessor(subItem.title)}</span>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  )}
                                </For>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      );
                    } else {
                      return (
                        <SidebarMenuItem>
                          <SidebarMenuButton as="a" href={item.url} tooltip={unAccessor(item.title)}>
                            <Show when={item.icon}>{item.icon?.({})}</Show>
                            <span>{unAccessor(item.title)}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    }
                  }}
                </For>
              </SidebarMenu>
            </SidebarGroup>
          );
        }}
      </For>
    </>
  );
}
