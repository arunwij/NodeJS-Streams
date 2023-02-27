import { Transform } from "stream";

class ReplaceText extends Transform {
  constructor(char) {
    super();
    this.replaceChar = char;
  }

  _transform(chunk, encoding, callback) {
    const transformedChunk = chunk
      .toString()
      .replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar);

    this.push(transformedChunk);

    callback();
  }
}

const replaceTextStream = new ReplaceText("x");

process.stdin.pipe(replaceTextStream).pipe(process.stdout);
