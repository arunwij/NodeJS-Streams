import http from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "./powder-day.mp4");

// MOST IMPORTANT THING IN HERE IS HOW WE READ DATA
// PLEASE NOTE THE fs.createReadStream

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "video/mp4");
  const rs = fs.createReadStream(filePath);
  rs.on("error", console.error);
  rs.pipe(res);
});

server.listen(port, () => {
  console.log(`NodeJS server is running on port ${port}`);
});
