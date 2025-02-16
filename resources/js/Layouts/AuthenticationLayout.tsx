import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import { PropsWithChildren, ReactNode } from "react";
import { BadgeCheck, Bell, ChevronsUpDown, CircleUser, CreditCard, LayoutGrid, LogOut, Settings, Sparkles, UserRoundCog, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Link, usePage } from "@inertiajs/react";
import LegoomID from "@/../images/LegoomID.svg"

export default function AuthenticationLayout(props: PropsWithChildren) {
  const user = usePage().props.auth.user;
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96">
        {props.children}
      </div>
    </div>
  )
}
