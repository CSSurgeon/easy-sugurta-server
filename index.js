import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

