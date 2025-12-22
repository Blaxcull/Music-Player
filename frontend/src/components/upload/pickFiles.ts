import { pickAudioFiles } from "@/components/functions/filePicker";

export const handlePickFiles = async () => {
  try {
    const files = await pickAudioFiles();
    return files;
  } catch (err) {
    if ((err as Error).name !== "AbortError") console.error(err);
    return [];
  }
};

