import { createWriteStream } from "fs";

const file = "log.txt";

const writeStream = createWriteStream(file);

process.stdin.pipe(writeStream);
