import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from '@/components/ui/sidebar';
import { Head, Link, usePage } from '@inertiajs/react';
import { AvatarImage } from '@radix-ui/react-avatar';
import {
    Building2,
    ChevronsUpDown,
    CircleUser,
    Fingerprint,
    LogOut,
    Sparkles,
} from 'lucide-react';
import { ReactNode } from 'react';

export interface UserSettingsLayoutProps {
    title: string;
    children?: ReactNode;
}

export default function UserSettingsLayout(props: UserSettingsLayoutProps) {
    const { user, settings } = usePage().props;
    return (
        <>
            <Head title={props.title} />
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>
                        <SidebarGroup>
                            <img
                                src={settings.logo}
                                className="m-auto mb-1 w-8"
                            />
                            <p className="text-center font-semibold">
                                {settings.name}
                            </p>
                        </SidebarGroup>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel></SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a
                                                href={route(
                                                    'user.settings.account',
                                                )}
                                            >
                                                <Fingerprint />
                                                <span>Account</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a
                                                href={route(
                                                    'user.settings.profile',
                                                )}
                                            >
                                                <CircleUser />
                                                <span>Profile</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <Sparkles />
                                                <span>Membership</span>
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
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={
                                                        user.profile
                                                            .profile_picture
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                                <AvatarFallback className="h-full w-full object-cover">
                                                    <CircleUser className="h-full w-full" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {user.account.name}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {user.account.email}
                                                </span>
                                            </div>
                                            <ChevronsUpDown className="ml-auto size-4" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                        align="end"
                                        sideOffset={4}
                                    >
                                        {user.account.role == 'admin' ? (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="w-full"
                                            >
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Building2 />
                                                    Admin Dashboard
                                                </DropdownMenuItem>
                                            </Link>
                                        ) : null}
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            className="w-full"
                                        >
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
                    <div className="mb-1 text-xl font-semibold">
                        {props.title}
                    </div>
                    {props.children}
                </div>
            </SidebarProvider>
        </>
    );
}
