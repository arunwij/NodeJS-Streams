import { createReadStream, createWriteStream } from "fs";
import logUpdate from "log-update";
import { PassThrough, Duplex } from "stream";

const file = "./powder-day.mp4";
const newFile = "./12-powder-day-copy.mp4";

class Throttle extends Duplex {
  constructor(milliseconds) {
    super();
    this.delay = milliseconds;
  }

  _read() {}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _final() {
    this.push(null);
  }
}

const readStream = createReadStream(file);
const writeStream = createWriteStream(newFile);
const passThroughStream = new PassThrough();
const throttleStream = new Throttle(1000);
let total = 0;

passThroughStream.on("data", (chunk) => {
  total += chunk.length;
  logUpdate(`Bytes passed: ${total}`);
});

readStream.pipe(throttleStream).pipe(passThroughStream).pipe(writeStream);
