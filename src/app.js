import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { getCourses, getFacul } from "./database/tables.js";
import { University } from "./database/unisversity.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.resolve(__dirname + "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/index.html"));
});

app.get("/api/tables/getFacul", async (req, res) => {
  try {
    const result = await getFacul();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/api/tables/getCourses", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ error: "Invalid Faculty ID" });
    return;
  }
  try {
    const result = await getCourses(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(3000);
