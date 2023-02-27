import { createReadStream } from "fs";
import { createServer } from "http";
import { stat } from "fs";
import { promisify } from "util";

const port = 3000;
const file = "./powder-day.mp4";
const statPromise = promisify(stat);

const server = createServer(async (req, res) => {
  const fileStat = await statPromise(file);

  console.log({ fileStat });
  res.writeHead(200, {
    "Content-Type": "video/mp4",
    "Content-Length": fileStat.size,
  });
  createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
