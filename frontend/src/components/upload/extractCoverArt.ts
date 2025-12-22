import * as mm from "music-metadata-browser";

export async function extractCoverArt(file: File): Promise<Blob | null> {
  const metadata = await mm.parseBlob(file);

  if (metadata.common.picture && metadata.common.picture.length > 0) {
    const picture = metadata.common.picture[0];
    const array = new Uint8Array(picture.data);
    return new Blob([array], { type: picture.format });
  }
  return null;
}

export async function getMetadata(file: File) {
  const metadata = await mm.parseBlob(file);
  return {
    title: metadata.common.title || file.name,
    artist: metadata.common.artist || "Unknown Artist",
    duration: metadata.format.duration ?? 0,
  };
}

