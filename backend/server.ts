import express from "express";
import cors from "cors";
import songsRoutes from './routes/song.routes';



const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(express.json());


app.use(cors(corsOptions));




// generate signed url for each song and cover
// insert into mongodb
app.use('/api/songs', songsRoutes);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
