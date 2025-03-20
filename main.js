import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

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

app.get("/sw.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "jis", "sw.js"));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
