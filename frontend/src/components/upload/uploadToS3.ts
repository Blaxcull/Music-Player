export async function uploadSongToS3(
  file: File,
  songUrl: string,
  coverArt: Blob | null,
  coverUrl: string
) {
  try {
    // Upload audio
    const songRes = await fetch(songUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (!songRes.ok) throw new Error(`Song upload failed: HTTP ${songRes.status}`);

    // Upload cover if exists
    if (coverArt) {
      const coverRes = await fetch(coverUrl, {
        method: "PUT",
        body: coverArt,
        headers: { "Content-Type": "image/png" },
      });

      if (!coverRes.ok) throw new Error(`Cover upload failed: HTTP ${coverRes.status}`);
    }

    console.log(`Uploaded: ${file.name}`);
  } catch (err) {
    console.error("Upload failed", file.name, err);
    throw err; // rethrow for the caller
  }
}

