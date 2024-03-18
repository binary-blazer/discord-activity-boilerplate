import "dotenv/config";
import { exec } from "child_process";
import fs from "node:fs";
import Logger from "./utils/Logger.js";

const env = fs.existsSync(".env");
const node_modules = fs.existsSync("node_modules");

if (!env) {
  Logger({
    type: "error",
    message: "Environment file not found. Creating one...",
  });
  await fs.promises.writeFile(
    ".env",
    `PORT=8080 # The port the server will run on (default 8080) (do not use 3000)

     CLIENT_ID="" # Your client id (discord application)
     CLIENT_SECRET="" # Your client secret (discord application)`,
    "utf-8",
  );
} else {
  Logger({
    type: "info",
    message: "Environment file found. Skipping...",
  });
}

if (!process.env.CLIENT_ID) {
  throw new Error("Client id not found in environment variables");
}

if (!process.env.CLIENT_SECRET) {
  throw new Error("Client secret not found in environment variables");
}

if (!node_modules) {
  Logger({
    type: "error",
    message: "Node modules not found. Installing dependencies...",
  });
  exec("pnpm install", (err, stdout, stderr) => {
    if (err) {
      Logger({ type: "error", message: `Error: ${err}` });
      return;
    }
    Logger({ type: "info", message: `stdout: ${stdout}` });
    Logger({ type: "info", message: `stderr: ${stderr}` });

    Logger({
      type: "info",
      message: "Dependencies installed. Starting server...",
    });
    Logger({ type: "info", message: "Server started successfully (client, server)" });
    exec("pnpm start:all", (err, stdout, stderr) => {
      if (err) {
        Logger({ type: "error", message: `Error: ${err}` });
        return;
      }
      Logger({ type: "info", message: `stdout: ${stdout}` });
      Logger({ type: "info", message: `stderr: ${stderr}` });

      Logger({ type: "info", message: "Server started successfully" });
    });
  });
} else {
  Logger({ type: "info", message: "Node modules found. Starting server..." });
  exec("pnpm start:all", (err, stdout, stderr) => {
    if (err) {
      Logger({ type: "error", message: `Error: ${err}` });
      return;
    }
    Logger({ type: "info", message: `stdout: ${stdout}` });
    Logger({ type: "info", message: `stderr: ${stderr}` });

    Logger({ type: "info", message: "Server started successfully" });
  });
}
