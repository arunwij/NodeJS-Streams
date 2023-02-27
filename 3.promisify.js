const fs = require("fs");
// get seconds as number
// if number <= 3 delay for 3 seconds and print => waited <no of seconds>
// if number > 3 throw new error => wait is too long

const delay = (seconds, callback) => {
  if (seconds > 3) {
    callback(new Error(`${seconds} seconds wait is too long`));
  } else {
    setTimeout(() => {
      callback(null, `waited for ${seconds} seconds`);
    }, seconds * 1000);
  }
};

// delay(3, (error, result) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(result);
//   }
// });

const promisedDelay = promisify(delay);

promisedDelay(2).then(console.log).catch(console.log);

// fs.writeFile("./myFile.txt", "my file content", (err) => {
//   if (err) {
//     console.log("there is an error", err);
//   } else {
//     console.log("file written successfully");
//   }
// });

const writeFile = promisify(fs.writeFile);

writeFile("./myFile.txt", "My File Content")
  .then(() => console.log("file written successfully"))
  .catch(console.log);

console.log("end of the tick");

function promisify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}
