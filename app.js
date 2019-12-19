"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const connectMongo = require("connect-mongo");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const logger = require("morgan");
const mongoose = require("mongoose");
//const cors = require("cors");
//const serveFavicon = require("serve-favicon");
const basicAuthenticationDeserializer = require("./middleware/basic-authentication-deserializer.js");
const bindUserToViewLocals = require("./middleware/bind-user-to-view-locals.js");
//const nodeSass = require("node-sass-middleware");
// ROUTERS

const indexRouter = require("./routes/index");
const authenticationRouter = require("./routes/authentication");
const lessonRouter = require("./routes/lesson");
const notesRouter = require("./routes/notes");
const homeworkRouter = require("./routes/homework");
const calendarRouter = require("./routes/calendar");

const MongoStore = connectMongo(expressSession);
const app = express();

//app.use(serveFavicon(join(__dirname, "client/build", "favicon.ico")));
//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.static(join(__dirname, "client/build")));
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 15,
      sameSite: "lax",
      httpOnly: true
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);

app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use("/api", indexRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/lesson", lessonRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/notes", notesRouter);
app.use("/api/homework", homeworkRouter);

app.get("*", (req, res, next) => {
  res.sendfile(join(__dirname, "client/build/index.html"));
});

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.json({ type: "error", error: { message: error.message } });
});

module.exports = app;
