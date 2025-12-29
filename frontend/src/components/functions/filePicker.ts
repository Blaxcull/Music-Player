export const pickerOpts: OpenFilePickerOptions = {
  types: [
    {
      description: "Audio Files",
      accept: {
        "audio/*": [".mp3", ".wav", ".flac", ".aac", ".m4a", ".ogg", ".wma"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: true,
};

export async function pickAudioFiles(): Promise<FileSystemFileHandle[]> {
  if (!("showOpenFilePicker" in window)) {
    throw new Error("File System Access API not supported");
  }

  const picker = window.showOpenFilePicker as (
    options?: OpenFilePickerOptions
  ) => Promise<FileSystemFileHandle[]>;

  return await picker(pickerOpts);
}

