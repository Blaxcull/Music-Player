// filePicker.ts
export const pickerOpts = {
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

// Just returns the file handles — nothing more
export async function pickAudioFiles(): Promise<FileSystemFileHandle[]> {
  if (!('showOpenFilePicker' in window)) {
    throw new Error('File System Access API not supported');
  }
  return await window.showOpenFilePicker(pickerOpts);
}
