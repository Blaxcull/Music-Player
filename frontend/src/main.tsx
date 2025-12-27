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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

