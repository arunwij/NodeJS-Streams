import fs from "fs";
const file = "./hello.txt";

function readFile(path, callback) {
  fs.readFile(path, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

readFile(file, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data.toString());
  }
});

process.nextTick(() => {
  console.log("after readFile");
});
