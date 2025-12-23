import { useState, useEffect } from "react";
import { handlePickFiles } from "./pickFiles.ts";
import { getMetadata } from "./extractCoverArt.ts";
import api from "@/lib/api";

export function useUploadSongs() {
  const [uploadedFiles, setUploadedFiles] = useState<FileSystemFileHandle[]>([]);
  const [songUrls, setSongUrls] = useState<string[]>([]);
  const [coverUrls, setCoverUrls] = useState<string[]>([]);

  const pickFiles = async () => {
    const newFiles = await handlePickFiles();
    setUploadedFiles([...newFiles]);
  };


const now = new Date();


const dateList = new Array(uploadedFiles.length).fill(now);

  useEffect(() => {
    (async () => {
      if (!uploadedFiles.length) return;

      const songNameList = uploadedFiles.map(f => f.name);
      const titleList: string[] = [];
      const artistList: string[] = [];
      const durationList: number[] = [];

      for (const fileHandle of uploadedFiles) {
        const file = await fileHandle.getFile();
        const meta = await getMetadata(file);
        titleList.push(meta.title);
        artistList.push(meta.artist);
        durationList.push(meta.duration);
      }

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
    })();
  }, [uploadedFiles, dateList]);

  return { uploadedFiles, songUrls, coverUrls, pickFiles, setUploadedFiles };
}

