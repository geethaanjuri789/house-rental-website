const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const Registration = require("./models/Registration");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));


// =======================
// 🔗 Connect to MongoDB
// =======================
const mongoURI =
  "mongodb+srv://Geetha1:Geetha@cluster0.zilms4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// =======================
// 🏠 House Schema
// =======================
const houseSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  description: String,
});

const House = mongoose.models.House || mongoose.model("House", houseSchema);


// =======================
// ROUTES
// =======================

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Add house
app.post("/add-house", async (req, res) => {
  try {
    const newHouse = new House(req.body);
    await newHouse.save();
    res.status(201).json({ message: "House added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all houses
app.get("/houses", async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =======================
// 👤 SINGLE WORKING REGISTER ROUTE
// =======================

app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, houseId } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name & Email required" });
    }

    const reg = new Registration({ name, email, phone, houseId });
    await reg.save();

    res.status(201).json({ message: "Registered successfully!" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// =======================
// 📋 Admin: Get all registrations
// =======================
app.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("houseId");
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete registration
app.delete("/api/registrations/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Registration deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update registration
app.put("/api/registrations/:id", async (req, res) => {
  try {
    const { name, email, houseId } = req.body;
    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      { name, email, houseId },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// =======================
// 🚀 Start Server
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

