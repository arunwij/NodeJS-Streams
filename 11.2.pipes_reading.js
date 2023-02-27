import { createReadStream, watchFile } from "fs";

const file = "log.txt";

const readStream = createReadStream(file);

readStream.on("data", (chunk) => {
  console.log(chunk.toString());
});

readStream.pause();

readStream.on("error", console.log);
readStream.on("close", () => console.log("read stream closed"));
readStream.on("end", () => console.log("readstream ended"));

watchFile(file, (curr, prev) => {
  readStream.read();
  readStream.pause();
});
