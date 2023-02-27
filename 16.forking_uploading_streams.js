import { createReadStream, createWriteStream } from "fs";
import { createServer } from "http";
import { stat } from "fs";
import { promisify } from "util";
import multiparty from "multiparty";

const port = 3000;
const file = "./powder-day.mp4";
const statPromise = promisify(stat);

const respondWithVideo = async (req, res) => {
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
};

const server = createServer((req, res) => {
  if (req.url === "/video") {
    respondWithVideo(req, res);
  } else if (req.method === "POST") {
    const form = new multiparty.Form();
    form.on("part", (part) => {
      part.pipe(createWriteStream(`./upload_${part.filename}`));
      part.on("close", () => {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        res.end(`<h2>File uploaded: ${part.filename}</h2>`);
      });
    });

    form.parse(req);
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`<form enctype="multipart/form-data" action="/" method="POST" >
                <input type="file" name="upload-file"/>
                <button type="submit">Upload File</button>
            </form>`);
  }
});

server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
