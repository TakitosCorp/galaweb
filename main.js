import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { config as configDotenv } from "dotenv";
import axios from "axios";

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

app.get("/youtube-feed", async (req, res) => {
  const cid = process.env.YOUTUBE_CHANNEL_ID;
  const channelURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`;

  try {
    const response = await axios.get(channelURL);
    const xmlData = response.data;

    const accept = req.headers.accept;
    if (accept.includes("application/json")) {
      res.json({ xmlData });
    } else if (accept.includes("text/html")) {
      res.send(xmlData);
    } else {
      res.type("application/xml").send(xmlData);
    }
  } catch (error) {
    console.error("Error fetching YouTube feed:", error);
    res.status(500).send("Error fetching YouTube feed");
  }
});

app.get("/yt", async (req, res) => {
  res.render("youtube");
});

app.get("/test", (req, res) => {
  res.render("test");
});

app.get("/sw.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "js", "sw.js"));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
