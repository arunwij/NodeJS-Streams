import { createReadStream, createWriteStream } from "fs";

const file = "./powder-day.mp4";
const copyFile = "./copy-powder-day.mp4";

const readStream = createReadStream(file);
const writeStream = createWriteStream(copyFile);

readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});
readStream.on("end", () => {
  writeStream.end();
});

writeStream.on("close", () => process.stdout.write("write stream closed"));
