const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Ak_Database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Schema & Model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// API Route
app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(200).json({ message: "Message saved successfully!" });
    } catch (error) {
    res.status(500).json({ error: "Error saving message" });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
