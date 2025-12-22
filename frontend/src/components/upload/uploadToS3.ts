export async function uploadSongToS3(
  file: File,
  songUrl: string,
  coverArt: Blob | null,
  coverUrl: string
) {
  try {
    const songUpload = await fetch(songUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (coverArt) {
      const coverUpload = await fetch(coverUrl, {
        method: "PUT",
        body: coverArt,
        headers: { "Content-Type": "image/png" },
      });

      if (!coverUpload.ok) throw new Error(`HTTP ${coverUpload.status}`);
    }

    if (!songUpload.ok) throw new Error(`HTTP ${songUpload.status}`);
  } catch (err) {
    console.error("Upload failed", file.name, err);
  }
}

