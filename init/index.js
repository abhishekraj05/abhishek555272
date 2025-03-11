const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listining.js");

// const Listing = require("../models/listining");

const MANGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MANGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: '67cb2d62953c7eb1d4fccf1f',
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initalize");
};

initDB();



