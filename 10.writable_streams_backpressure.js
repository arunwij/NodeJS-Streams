import { createReadStream, createWriteStream } from "fs";

const file = "./powder-day.mp4";
const copyFile = "./copy-powder-day.mp4";

const readStream = createReadStream(file);
const writeStream = createWriteStream(copyFile, {
  highWaterMark: 1000000000000,
});

readStream.on("data", (chunk) => {
  const done = writeStream.write(chunk);

  if (!done) {
    console.log("backpressure!!");
    readStream.pause();
  }
});

readStream.on("pause", () => console.log("readstream paused"));

readStream.on("resume", () => console.log("readstream resumed"));

readStream.on("end", () => {
  writeStream.end();
});

writeStream.on("drain", () => {
  console.log("writestream drained");
  readStream.resume();
});

writeStream.on("close", () => process.stdout.write("write stream closed"));
