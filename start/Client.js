import "dotenv/config";
import { exec } from "child_process";
import Logger from "../utils/Logger.js";
import fs from "node:fs";

const env = fs.existsSync("client/.env");
const node_modules = fs.existsSync("client/node_modules");

if (!node_modules) {
  Logger({
    type: "error",
    message: "Node modules not found, installing...",
  });
  exec("cd client && pnpm install", (err, stdout, stderr) => {
    if (err) {
      Logger({ type: "error", message: `${err}` });
      return;
    }
    Logger({ type: "info", message: `stdout: ${stdout}` });
    Logger({ type: "info", message: `stderr: ${stderr}` });
  });
  Logger({
    type: "info",
    message: "Node modules installed successfully",
  });
}

if (!env) {
  Logger({
    type: "error",
    message: "Client environment file not found, creating one...",
  });
  await fs.promises.writeFile(
    "client/.env",
    `VITE_CLIENT_ID=${process.env.CLIENT_ID} # added and updated automatically by the server`,
    "utf-8",
  );
} else {
  Logger({
    type: "info",
    message: "Client environment file found, updating...",
  });
  fs.readFile("client/.env", "utf-8", (err, data) => {
    if (err) {
      Logger({ type: "error", message: `${err}` });
      return;
    }
    const newValue = data.replace(
      /VITE_CLIENT_ID=(.*)/,
      `VITE_CLIENT_ID=${process.env.CLIENT_ID} # added and updated automatically by the server`,
    );
    fs.writeFile("client/.env", newValue, "utf-8", (err) => {
      if (err) {
        Logger({ type: "error", message: `${err}` });
        return;
      }
    });
    Logger({
      type: "info",
      message: "Client environment file updated successfully",
    });
  });
}

await fs.promises.writeFile(
  "client/vite.config.js",
  `import {defineConfig} from 'vite';

  // https://vitejs.dev/config/
  export default defineConfig({
    envDir: './',
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:${process.env.PORT || 8080}',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
      hmr: {
        clientPort: 443,
      },
    },
  });
  `,
  "utf-8",
);

Logger({ type: "info", message: "Server started successfully" });
exec("cd client && pnpm dev", (err, stdout, stderr) => {
  if (err) {
    Logger({ type: "error", message: `${err}` });
    return;
  }
  Logger({ type: "info", message: `stdout: ${stdout}` });
  Logger({ type: "info", message: `stderr: ${stderr}` });
});
