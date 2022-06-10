import { app } from "server/app";

const i = "/api";
app.use(`${i}/auth`, require("./reducers/auth.reducer"));
