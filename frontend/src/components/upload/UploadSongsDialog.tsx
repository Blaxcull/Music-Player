import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUploadSongs } from "./useUploadSongs.ts";
import { extractCoverArt } from "./extractCoverArt.ts";
import { uploadSongToS3 } from "./uploadToS3.ts";
import { Progress } from "@/components/ui/progress";


interface UploadSongsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isUploading: boolean
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
}


export function UploadSongsDialog({ open, onOpenChange, isUploading, setIsUploading }: UploadSongsDialogProps) {


  const { uploadedFiles, songUrls, coverUrls, pickFiles } = useUploadSongs();

  const [uploadedCount, setUploadedCount] = React.useState(0);




//get uploaded count for progress bar
React.useEffect(() => {
  setUploadedCount(0);
}, [uploadedFiles]);

const totalFiles = uploadedFiles.length;
const progress =
  totalFiles === 0 ? 0 : Math.round((uploadedCount / totalFiles) * 100);


//upload songs to s3 with signed url
const handleUploadSongs = async () => {
      if (isUploading) return; // extra safety
  setUploadedCount(0);

  setIsUploading(true);

  for (let i = 0; i < uploadedFiles.length; i++) {
    const fileHandle = uploadedFiles[i];
    const file = await fileHandle.getFile();

    try {
      await uploadSongToS3(
        file,
        songUrls[i],
        await extractCoverArt(file),
        coverUrls[i]
      );

      setUploadedCount(prev => prev + 1);

    } catch (err) {
      console.error("Upload failed", err);
    }
  }
  setIsUploading(false);
};



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild><span className="hidden" /></DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>Upload Songs</DialogHeader>
        <div className="relative w-full h-80 bg-gray-800 p-4 text-white rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center text-lg select-none">
            Drag and drop your songs here
          </div>
          <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-3">
            <div className="text-sm opacity-80">or</div>
            <Button onClick={pickFiles}>Browse Files</Button>
          </div>
        </div>
        <DialogFooter>
        {totalFiles > 0 && (
  <Progress value={progress} className="w-full mt-4" />
)}

  <Button
  onClick={handleUploadSongs}
  disabled={isUploading || totalFiles === 0}
>
  {isUploading ? "Uploading..." : "Upload Songs"}
</Button>

</DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

