const delay = () => {
  return new Promise((resolve, rejects) => {
    resolve("inside promise");
  });
};

delay().then(console.log);

console.log("end of the first tick");
