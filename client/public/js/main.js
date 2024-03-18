import { DiscordSDK } from "@discord/embedded-app-sdk";
import "../../styles/main.css";

const discordSdk = new DiscordSDK(import.meta.env.VITE_CLIENT_ID);

discordSdk.ready().then(() => {
  console.log("Discord SDK is ready");
});

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Welcome to the Discord Activity Boilerplate (DAB) by BinaryBlazer</h1>
  </div>
`;
