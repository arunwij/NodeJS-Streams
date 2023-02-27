import { Readable } from "stream";

class StreamFromArray extends Readable {
  constructor(array) {
    super({ objectMode: true });
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index < this.array.length) {
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      };
      this.push(chunk);
      this.index++;
    } else {
      this.push(null);
    }
  }
}

let carBrands = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "Nissan",
  "Hyundai",
  "Kia",
  "BMW",
  "Mercedes-Benz",
  "Audi",
];

const carBrandsStream = new StreamFromArray(carBrands);

carBrandsStream.on("data", console.log);
carBrandsStream.on("end", () => console.log("End of the stream"));
carBrandsStream.on("error", console.error);
