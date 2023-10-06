import { config } from "../config/config";
import { endpoint } from "../config/endpoint";

const ytVideoToAudio = (url) => {
  return fetch(`${config.SERVER_DOMAIN}${endpoint["ytVideoAudio"]}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
};

export default ytVideoToAudio;
