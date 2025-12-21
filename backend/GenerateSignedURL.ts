import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import dotenv from 'dotenv';
dotenv.config(); //

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});


export async function getSignedURL(fileName: string) {
  const key = `${Date.now()}-${fileName}`;
  const audioKey = `uploads/${key}/audio.mp3`;
  const coverKey = `uploads/${key}/cover.png`;

  const audioCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: audioKey,
    ContentType: "audio/mpeg",
  });

  const coverCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: coverKey,
    ContentType: "image/png",
  });

  const audioUrl = await getSignedUrl(s3, audioCommand, { expiresIn: 60 });
  const coverUrl = await getSignedUrl(s3, coverCommand, { expiresIn: 60 });

  return { success: { song: audioUrl, cover: coverUrl } };
}
