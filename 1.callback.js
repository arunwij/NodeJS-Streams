// callback example

console.log("start");

function hideString(str, done) {
  process.nextTick(() => {
    const replacedStr = str.replace(/[a-zA-Z]/g, "X");
    console.log({ replacedStr });
    done(replacedStr);
  });
}

hideString("My name is Aruna", (res) => {
  console.log(res);
});

console.log("end");
