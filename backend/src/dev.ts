import app from "./server";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Local server running on http://localhost:${PORT}`);
});

