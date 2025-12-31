"use client"

import * as React from "react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function AddToPlaylist({
  children,

}: {
  children: React.ReactNode
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuLabel>Add to playlist</ContextMenuLabel>
        <ContextMenuSeparator />

        <ContextMenuItem>Playlist 1</ContextMenuItem>
        <ContextMenuItem>Playlist 2</ContextMenuItem>
        <ContextMenuItem>Playlist 3</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

