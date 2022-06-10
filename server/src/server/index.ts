import { app, server } from "./app";
import("server/database");

const PORT = process.env.PORT || 4000;
const DOMAIN = process.env.DOMAIN || "localhost";
const PROTOCOL = process.env.PROTOCOL || "http";

import("routes/index");

// app.get("/", (req, res) => {
//   return res.send("userwwe");
// });

server.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server is running at ${PROTOCOL}://${DOMAIN}:${PORT}`
  );
});
