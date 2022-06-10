import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import csrf from "csurf";
// import i18n from "../middlewares/common/i18n";

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();
const server = require("http").createServer(app);
const MongoStore = require("connect-mongodb-session")(session);

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
  })
);
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
// app.use(i18n);
const store = new MongoStore({
  collection: "sessions",
  uri: process.env.DB,
});
app.use(
  session({
    secret: <string>process.env.SECRET || "asdasd",
    resave: false,
    saveUninitialized: false,
    store,
    // 7 days
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

app.all("*", function (req, res, next) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

export { app, server };
