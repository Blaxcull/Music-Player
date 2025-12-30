import express from "express";
import cors from "cors";
import songsRoutes from "./routes/song.routes";

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/songs", songsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

