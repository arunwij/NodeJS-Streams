import { createReadStream } from "fs";
import { createServer } from "http";
import { stat } from "fs";
import { promisify } from "util";

const port = 3000;
const file = "./powder-day.mp4";
const statPromise = promisify(stat);

const server = createServer(async (req, res) => {
  const { size } = await statPromise(file);
  const range = req.headers.range;

  if (range) {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;

    res.writeHead(206, {
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": end - start + 1,
    });

    createReadStream(file, { start: start, end: end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": size,
    });
    createReadStream(file).pipe(res);
  }
});

server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
