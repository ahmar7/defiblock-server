const express = require("express");
const app = express();

const bodyparser = require("body-parser");
// Environment file set
const dotnet = require("dotenv");
dotnet.config({ path: "./config/config.env" });
const cors = require("cors");
app.use(express.json({ limit: "2mb" }));
let cookieParser = require("cookie-parser");
app.use(cookieParser());
//

let ALLOWED_ORIGINS = [
  "https://defiblock.pro",
  "https://www.defiblock.pro",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];
app.use((req, res, next) => {
  let origin = req.headers.origin;
  let theOrigin =
    ALLOWED_ORIGINS.indexOf(origin) >= 0 ? origin : ALLOWED_ORIGINS[0];
  res.header("Access-Control-Allow-Origin", theOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header("Access-Control-Allow-Credentials", true);

  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH,DELETE, OPTIONS"
  );
  next();
});
//
// app.use(
//   cors({
//     origin: process.env.CORS,

//     credentials: true,
//     exposedHeaders: ["Set-Cookie"],
//   })
// );
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// All Routes
const coins = require("./routes/coinRoute");
const user = require("./routes/userRoute");
app.use("/api/v1", coins);
app.use("/api/v1", user);

module.exports = app;
