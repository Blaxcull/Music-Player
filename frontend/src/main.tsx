import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllSongs from "./Displays/AllSongs";
import LikedSongs from "./Displays/LikedSongs";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllSongs/>} />
<<<<<<< HEAD
        <Route path="/LikedSongs" element={<LikedSongs/>} />
=======
>>>>>>> a44f2d32bde70822c9fcf1ffab91e2121ad40f63
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

