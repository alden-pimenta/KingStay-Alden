// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// // mongodb://127.0.0.1:27017/wanderlust
// main()
//   .then(() => {
//     console.log("connected to DB");
//     return initDB();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});

//   // initData.data = initData.data .map ((obj)=>({...obj, owner:'694297966d01525df07e9fce'}))

//   initData.data = initData.data.map(obj => ({
//   ...obj,
//   owner: new mongoose.Types.ObjectId("694297966d01525df07e9fce")
// }));

//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// // initDB();



const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    // Only run initDB once the connection is secure
    return initDB();
  })
  .then(() => {
      // Optional: Close connection when done
      // mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  // Ensure initData.data exists before mapping
  if (!initData.data) {
      console.log("Error: initData.data is undefined. Check data.js exports.");
      return;
  }

  // Your mapping logic is correct
  initData.data = initData.data.map((obj) => ({
    ...obj,
 owner:"694038620ca30dcbb6212858"// You can pass the string directly, Mongoose handles the casting
  }));




  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

// REMOVE the call from here:
// initDB();

