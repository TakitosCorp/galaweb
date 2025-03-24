import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { config as configDotenv } from "dotenv"; 

configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/yt", (req, res) => {
  res.render("youtube", { cid: process.env.YOUTUBE_CHANNEL_ID });
});

app.get("/sw.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "js", "sw.js"));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
