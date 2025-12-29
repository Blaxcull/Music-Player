import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUploadSongs } from "./useUploadSongs.ts";
import { extractCoverArt } from "./extractCoverArt.ts";
import { uploadSongToS3 } from "./uploadToS3.ts";
import { Progress } from "@/components/ui/progress";

interface UploadSongsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UploadSongsDialog({
  open,
  onOpenChange,
  isUploading,
  setIsUploading,
}: UploadSongsDialogProps) {
  const { uploadedFiles, songUrls, coverUrls, pickFiles } = useUploadSongs();
  const [uploadedCount, setUploadedCount] = React.useState(0);

  React.useEffect(() => setUploadedCount(0), [uploadedFiles]);

  const totalFiles = uploadedFiles.length;
  const progress = totalFiles === 0 ? 0 : Math.round((uploadedCount / totalFiles) * 100);

  const handleUploadSongs = async () => {
    if (isUploading) return;
    if (songUrls.length !== totalFiles || coverUrls.length !== totalFiles) {
      console.error("Signed URLs not ready yet!");
      return;
    }

    setUploadedCount(0);
    setIsUploading(true);

    for (let i = 0; i < uploadedFiles.length; i++) {
      const fileOrHandle = uploadedFiles[i];
      const file: File = "getFile" in fileOrHandle ? await fileOrHandle.getFile() : fileOrHandle;

      try {
        const coverArt = await extractCoverArt(file); // can be null
        await uploadSongToS3(file, songUrls[i], coverArt, coverUrls[i]);
        setUploadedCount((prev) => prev + 1);
      } catch (err) {
        console.error(`Failed to upload ${file.name}`, err);
      }
    }

    setIsUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <span className="hidden" />
      </DialogTrigger>

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

        <DialogFooter className="flex flex-col gap-2">
          {totalFiles > 0 && <Progress value={progress} className="w-full mt-2" />}
          <Button onClick={handleUploadSongs} disabled={isUploading || totalFiles === 0}>
            {isUploading ? "Uploading..." : "Upload Songs"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

