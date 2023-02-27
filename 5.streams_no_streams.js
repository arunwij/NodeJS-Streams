import http from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { promisify } from "util";

const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "./powder-day.mp4");

// MOST IMPORTANT THING IN HERE IS HOW WE READ DATA
// PLEASE NOTE THE fs.readFile
const readFilePromise = promisify(fs.readFile);

const server = http.createServer((req, res) => {
  readFilePromise(filePath)
    .then((data) => {
      res.setHeader("Content-Type", "video/mp4");
      res.end(data);
    })
    .catch((err) => {
      console.err(err);
    });
});

server.listen(port, () => {
  console.log(`NodeJS server is running on port ${port}`);
});
