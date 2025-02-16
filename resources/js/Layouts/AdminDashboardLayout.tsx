import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import { PropsWithChildren, ReactNode } from "react";
import { BadgeCheck, Bell, ChevronsUpDown, CircleUser, CreditCard, LayoutGrid, LogOut, Settings, Sparkles, UserRoundCog, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Head, Link, usePage } from "@inertiajs/react";
import LegoomID from "@/../images/LegoomID.svg"

export interface AdminDashboardLayoutProps {
  organization_name: string
  organization_logo: string
  profile_picture: string
  title: string
  children?: ReactNode
}

export default function AdminDashboardLayout(props: AdminDashboardLayoutProps) {
  const user = usePage().props.auth.user;
  console.log(props.organization_logo)
  return (
    <SidebarProvider>
      <Head title={props.title}/>
      <Sidebar>
        <SidebarHeader>
          <SidebarGroup>
            <img src={props.organization_logo} className="w-8 m-auto mb-1" />
            <p className="text-center font-semibold">{props.organization_name}</p>
          </SidebarGroup>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <a href={route('admin.users')}>
                      <Users />
                      <span>Users</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={route('admin.applications')}>
                      <LayoutGrid />
                      <span>Applications</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={route('admin.settings')}>
                      <Settings />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <CircleUser className="m-auto" />
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="end"
                  sideOffset={4}
                >
                  <Link href={route('user.settings')} className="w-full">
                    <DropdownMenuItem className="cursor-pointer">
                      <UserRoundCog />
                      Account Settings
                    </DropdownMenuItem>
                  </Link>
                  <Link href={route('logout')} method="post" className="w-full">
                    <DropdownMenuItem className="cursor-pointer">
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>

        </SidebarFooter>
      </Sidebar>
      <div className="w-full p-5">
      <div className="text-xl font-semibold mb-1">{props.title}</div>
        {props.children}
      </div>
    </SidebarProvider>
  )
}
