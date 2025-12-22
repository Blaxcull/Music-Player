
import { useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { UploadSongsDialog } from "@/components/upload/UploadSongsDialog"

export function ProfileDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showUploadNotice, setShowUploadNotice] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fadeOut, setFadeOut] = useState(false);


// Show uploading in background notice for 3 seconds
  const showNotice = () => {
  setShowUploadNotice(true);
  setFadeOut(false);

  setTimeout(() => {
    setFadeOut(true); // start fade
    setTimeout(() => setShowUploadNotice(false), 500); // remove after fade animation
  }, 3000); // show for 3 seconds before fading
};


  const handleUploadSongsDialog = () => {
    setDropdownOpen(false)
    setDialogOpen(true)
    setShowUploadNotice(false)
  }

//lift isuploading open state to parent
  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open)

    if (!open && isUploading) {
        showNotice()
    }
  }

  return (
    <>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleUploadSongsDialog}>
            Upload Songs
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UploadSongsDialog
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
          isUploading={isUploading}
  setIsUploading={setIsUploading}
      />

{showUploadNotice && (
  <div
    className={`fixed bottom-4 right-4 rounded-md bg-black px-4 py-2 text-sm text-white shadow transition-opacity duration-500 ${
      fadeOut ? "opacity-0" : "opacity-100"
    }`}
  >
    Upload will continue in background
  </div>
)}
    </>
  )
}

