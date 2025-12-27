import { Heart,  Home, } from "lucide-react"
import MusicIcon from "@/assets/music-svgrepo-com.svg?react";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
//  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Songs",
    url: "/",
    icon: Home,
  },
  {
    title: "Liked",
    url: "/LikedSongs",
    icon: Heart,
  },
]



export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
        <SidebarHeader className="flex flex-row items-center pb-6 ">
        <MusicIcon className="w-15 h-13 " />
        <span className="text-3xl font-bold">
        PLAYER
        </span>
        </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>

<Link
  to={item.url} // use 'to' instead of 'href'
  className="pl-5 h-10 pt-0 pb-0 flex items-center"
>
  <item.icon className="w-10 h-10 mr-1" />
  <span>{item.title}</span>
</Link>
</SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
