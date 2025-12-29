export async function pickAudioFiles(): Promise<File[]> {
  if ("showOpenFilePicker" in window) {
    const pickerOpts: OpenFilePickerOptions = {
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
    const picker = window.showOpenFilePicker as (
      options?: OpenFilePickerOptions
    ) => Promise<FileSystemFileHandle[]>;
    const handles = await picker(pickerOpts);
    return Promise.all(handles.map((h) => h.getFile()));
  } else {
    // Fallback for unsupported browsers
    return new Promise<File[]>((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.multiple = true;
      input.accept = "audio/*";
      input.onchange = () => {
        if (input.files) resolve(Array.from(input.files));
      };
      input.click();
    });
  }
}

