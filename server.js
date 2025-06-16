const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/submitAnalysis", (req, res) => {
  console.log("Received analysis:", req.body);
  res.json({ status: "ok" });
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
  res.send("🚀 GPT Logger running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));