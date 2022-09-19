import express from "express";
import cors from "cors";
import e from "express";
import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
const port = process.env.PORT || 3000;
const app = express();
const client = new Client();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "success",
  });
});

app.post("/api", async (req, res) => {
  const { message, phone } = req.body;
  try {
    let result = await client.sendMessage(`${phone}@c.us`, message);
    console.log(result);
    return res.status(200).send({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: e.toString(),
      message: "Errror",
    });
  }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
