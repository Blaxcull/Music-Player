import express from "express";
import cors from "cors";
import songsRoutes from "../routes/song.routes.ts";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/songs", songsRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

export default app; // ✅ IMPORTANT

