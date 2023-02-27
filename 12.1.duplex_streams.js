import { createReadStream, createWriteStream } from "fs";
import logUpdate from "log-update";
import { PassThrough } from "stream";

const file = "./powder-day.mp4";
const newFile = "./12-powder-day-copy.mp4";

const readStream = createReadStream(file);
const writeStream = createWriteStream(newFile);
const passThroughStream = new PassThrough();
let total = 0;

passThroughStream.on("data", (chunk) => {
  total += chunk.length;
  logUpdate(`Bytes passed: ${total}`);
});

readStream.pipe(passThroughStream).pipe(writeStream);
