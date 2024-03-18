import "dotenv/config";
import express from "express";
import cors from "cors";
import Request from "../helpers/Request.js";
import Response from "../helpers/Response.js";
import Logger from "../utils/Logger.js";

export default async function StartServer() {
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(express.json());
  app.use(cors());

  app.use((req, res, next) => {
    res.header(
      "X-Powered-By",
      "BinaryBlazer DAB (Discord Activity Boilerplate)",
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  app.post("/api/token", async (req, res) => {
    const response = await Request({
      url: `https://discord.com/api/oauth2/token`,
      method: "POST",
      body: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: req.body.code,
      },
    });

    const { access_token } = await response.json();
    await Response({
      res,
      code: 200,
      message: "Token fetched successfully",
      data: { access_token },
    });
  });

  app.listen(port, () => {
    Logger({
      type: "info",
      message: `Server running on port ${port} | http://localhost:${port}`,
    });
  });
}
