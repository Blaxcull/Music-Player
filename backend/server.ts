import express from "express";
import cors from "cors";
import songsRoutes from "./routes/song.routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://music-player-qudj.vercel.app",
      ];

      // allow server-to-server / Postman / Vercel
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// routes
app.use("/api/songs", songsRoutes);

// HEALTH CHECK (IMPORTANT)
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

