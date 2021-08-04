const PUBLIC_UI_PROTOCOL = process.env.PUBLIC_UI_SECURE === "true" ? "https:" : "http:";
const PUBLIC_UI_HOSTNAME = process.env.PUBLIC_UI_HOSTNAME;
const PUBLIC_UI_PORT = process.env.PUBLIC_UI_PORT || "80";

const PUBLIC_UI_URL = `${PUBLIC_UI_PROTOCOL}//${PUBLIC_UI_HOSTNAME}:${PUBLIC_UI_PORT}`;

export {
  PUBLIC_UI_URL,
  PUBLIC_UI_PROTOCOL,
  PUBLIC_UI_HOSTNAME,
  PUBLIC_UI_PORT,
}


const PUBLIC_SERVER_PROTOCOL = process.env.PUBLIC_SERVER_SECURE  === "true" ? "https:" : "http:";;
const PUBLIC_SERVER_HOSTNAME = process.env.PUBLIC_SERVER_HOSTNAME;
const PUBLIC_SERVER_PORT = process.env.PUBLIC_SERVER_PORT || "80";

const PUBLIC_SERVER_URL = `${PUBLIC_SERVER_PROTOCOL}//${PUBLIC_SERVER_HOSTNAME}:${PUBLIC_SERVER_PORT}`

export {
  PUBLIC_SERVER_URL,
  PUBLIC_SERVER_PROTOCOL,
  PUBLIC_SERVER_HOSTNAME,
  PUBLIC_SERVER_PORT
}
