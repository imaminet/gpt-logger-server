const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ POSTエンドポイント `/log` の実装
app.post("/log", (req, res) => {
  const data = req.body;
  console.log("Received log:", data);

  // 200 OKレスポンスを返す
  res.status(200).send({ message: "Logged successfully" });
});

// ✅ 必須ファイル提供（OpenAPI / Plugin定義）
app.get("/openapi.json", (req, res) => {
  res.sendFile(path.join(__dirname, "openapi.json"));
});

app.get("/.well-known/ai-plugin.json", (req, res) => {
  res.sendFile(path.join(__dirname, ".well-known", "ai-plugin.json"));
});

app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

// ✅ 動作確認ルート（ルートアクセス用）
app.get("/", (req, res) => {
  res.send("🟢 GPT Logger Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
