const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  houseId: String
});

module.exports = mongoose.model("Registration", registrationSchema);
