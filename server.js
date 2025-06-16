const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(express.json());

app.post("/log", async (req, res) => {
  const data = req.body;
  console.log("Received chart log:", data);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyjqG8HNeIYHgayz7VrjhAMv4RjyPi6qZ8oN6kdORe8vvG7nWT6HCbKvUXGThD1w-FeMw/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.text();
    console.log("GAS response:", result);

    res.status(200).json({ message: "Logged successfully", result });
  } catch (error) {
    console.error("Error sending to GAS:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/openapi.json", (req, res) => {
  res.sendFile(path.join(__dirname, "openapi.json"));
});

app.get("/.well-known/ai-plugin.json", (req, res) => {
  res.sendFile(path.join(__dirname, ".well-known/ai-plugin.json"));
});

app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.get("/", (req, res) => {
  res.send("🧠 GPT Logger running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
