import fs from "fs";
const file = "./powder-day.mp4";

const stream = fs.createReadStream(file);

stream.on("data", (chunk) => {
  console.log("Size: ", chunk.length);
});

stream.on("end", () => {
  console.log("Stream finished.");
});

stream.on("error", console.error);

stream.on("open", () => console.log("Stream opened"));

stream.on("close", () => console.log("Stream closed"));

stream.pause();

process.stdin.on("data", (chunk) => {
  console.log("stdin: ", chunk.toString().trim());

  if (chunk.toString().trim() === "finish") {
    stream.resume();
  }

  stream.read();
});
