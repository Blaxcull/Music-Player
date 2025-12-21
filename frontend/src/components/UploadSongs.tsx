"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

import {useState} from "react"
import {pickAudioFiles} from "@/components/Functions/UploadSongsButton"

import api from '@/lib/api';
import { useEffect } from "react"



interface EditUploadSongsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadSongsDialog({ open, onOpenChange }: EditUploadSongsDialogProps) {
  const [uploadedFiles, setUploadedFiles] = useState<FileSystemFileHandle[]>([]);


  const handleUploadClick = async () => {
    try {
      const newFiles = await pickAudioFiles();
      setUploadedFiles(prev => [...prev, ...newFiles]); // ✅ Triggers re-render



    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('File selection failed:', err);
      }
    }
  };


// sendSongNameList to backend for generating signed url for uploading to s3
const sendSongNameList = async (songName: Array<string>) => {
  const res = await api.post('/api/songs/uploadSongURL',
                             {userID: 1, songName: songName});
  return res.data;
};

useEffect(() => {
    if (uploadedFiles.length > 0) {
      const songNameList = uploadedFiles.map(file => file.name);

      sendSongNameList(songNameList).then(res => {
        console.log(res);
      })
    }
  }, [uploadedFiles]);



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <span className="hidden" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
        </DialogHeader>

<div className="relative w-full h-80 bg-gray-800 p-4 text-white rounded-lg">

  <div className="select-none absolute inset-0 flex items-center justify-center text-lg">



    Drag and drop your songs here
  </div>

  {/* Bottom content */}
  <div className=" absolute bottom-16 left-0 right-0 flex flex-col items-center gap-3"

  

  >
    <div className="text-sm opacity-80">or</div>

    <Button variant="default" className="text-xl select-none"

    onClick={() => {
        handleUploadClick()
    }}
    >
      Browse Files
    </Button>
  </div>

</div>
        <DialogFooter>
<div>

{uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          </div>
)}
</div>

<Button type="submit">Save</Button>


        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

