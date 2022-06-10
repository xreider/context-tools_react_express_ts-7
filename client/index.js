const express = require("express");
const path = require("path");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || "localhost";
const PROTOCOL = process.env.PROTOCOL || "http";
const API = process.env.API || "http://localhost:4000";

app.use(express.static(path.resolve(__dirname, "build")));

app.use(
  "/api",
  createProxyMiddleware({
    target: API,
  })
);

// app.all("*", (req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// And run the server
app.listen(PORT, function () {
  console.log(
    `⚡️[client]: Client is running at ${PROTOCOL}://${DOMAIN}:${PORT}`
  );
});
