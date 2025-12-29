import express from "express";
import cors from "cors";
import songsRoutes from "./routes/song.routes.ts";

const app = express();

/**
 * Allowed frontend origins
 * IMPORTANT: must match EXACTLY what the browser sends
 */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://music-player-qudj.vercel.app",
];

/**
 * CORS configuration
 */
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server requests (Postman, curl, Vercel internal)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

/**
 * MIDDLEWARE ORDER MATTERS
 */
app.use(cors(corsOptions));
app.use(express.json());

/**
 * Routes
 */
app.use("/api/songs", songsRoutes);

/**
 * Health check (VERY useful for Vercel debugging)
 */
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * Global error handler
 * Ensures CORS headers are still sent on errors
 */
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

/**
 * Local dev only
 * (Vercel ignores app.listen)
 */
if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

