const mongoose = require("mongoose");
const House = require("./models/House");

const mongoURI = "your-mongodb-connection-string-here"; // same as in server.js

mongoose.connect(mongoURI).then(async () => {
  await House.deleteMany({}); // clear old data
  await House.insertMany([
    { name: "Cozy Apartment", location: "Hyderabad", price: 15000 },
    { name: "Luxury Villa", location: "Bangalore", price: 50000 },
    { name: "Family House", location: "Chennai", price: 25000 },
  ]);
  console.log("✅ Houses added");
  mongoose.connection.close();
});
