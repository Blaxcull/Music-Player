import { useState, useEffect } from "react";
import { handlePickFiles } from "./pickFiles.ts";
import { getMetadata } from "./extractCoverArt.ts";
import api from "@/lib/api";

type UploadableFile = File | FileSystemFileHandle;

export function useUploadSongs() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadableFile[]>([]);
  const [songUrls, setSongUrls] = useState<string[]>([]);
  const [coverUrls, setCoverUrls] = useState<string[]>([]);

  const pickFiles = async () => {
    const newFiles = await handlePickFiles(); // returns File[]
    setUploadedFiles(newFiles);
  };

  useEffect(() => {
    if (!uploadedFiles.length) return;

    (async () => {
      const now = new Date();
      const dateList = new Array(uploadedFiles.length).fill(now);

      const songNameList: string[] = [];
      const titleList: string[] = [];
      const artistList: string[] = [];
      const durationList: number[] = [];

for (const fileOrHandle of uploadedFiles) {
  let file: File;

  if ("getFile" in fileOrHandle) {
    file = await fileOrHandle.getFile();
  } else {
    file = fileOrHandle;
  }

  const meta = await getMetadata(file);

  // Fallback if metadata missing
  const baseName = file.name.replace(/\.[^/.]+$/, ""); // remove extension
  const parts = baseName.split(" - "); // try "Artist - Title" format

  const title = meta.title || (parts[1] || parts[0]);
  const artist = meta.artist || (parts[1] ? parts[0] : "Unknown Artist");
  const duration = meta.duration || 0;

  songNameList.push(file.name); // use actual file name for S3
  titleList.push(title);
  artistList.push(artist);
  durationList.push(duration);
}

      try {
          console.log("getsignedurls");
        const res = await api.post("/api/songs/uploadSongURL", {
          userID: 1,
          songName: songNameList,
          titleList,
          artistList,
          durationList,
          dateList,
        });

        setSongUrls([...res.data.SignedSongURLList]);
        setCoverUrls([...res.data.SignedCoverURLList]);
      } catch (err) {
        console.error("Upload failed", err);
      }
    })();
  }, [uploadedFiles]);

  return { uploadedFiles, songUrls, coverUrls, pickFiles, setUploadedFiles };
}

