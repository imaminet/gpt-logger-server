const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Google Apps ScriptのWebアプリURL（中継先）
const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbxbP9je7IEMrFthE8GjXBcWWO5uSiL49dK91FQVE0w1Rqz7aYQIg2waheT0aszBAVJngQ/exec";

app.use(express.json());

app.post("/log", async (req, res) => {
  console.log("📥 Received chart log:", req.body);

  try {
    // GASへ転送
    const response = await axios.post(GAS_ENDPOINT, req.body);
    console.log("📤 Forwarded to GAS:", response.data);
    res.status(200).send({ message: "Logged and forwarded to GAS" });
  } catch (error) {
    console.error("❌ Error forwarding to GAS:", error);
    res.status(500).send({ error: "Failed to forward to GAS" });
  }
});

// 以下はAI Plugin定義ファイル用
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
  res.send("📈 GPT Logger running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
