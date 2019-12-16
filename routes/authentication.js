"use strict";

const { Router } = require("express");
const router = new Router();
const User = require("./../models/user");
const bcryptjs = require("bcryptjs");

router.get("/user", async (req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    res.sendStatus(401);
  } else {
    try {
      const user = await User.findById(userId).exec();
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
});

router.patch("/user", async (req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    res.sendStatus(401);
  } else {
    try {
      const newName = req.body.name;
      const user = await User.findByIdAndUpdate(userId, {
        name: newName
      }).exec();
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
});

router.post("/sign-up", async (req, res, next) => {
  console.log("signup route====================>", req.body);

  const {
    name,
    email,
    password,
    instrumentname,
    levelsname,
    levelsprice,
    city,
    type
  } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      instrumentname,
      levelsname,
      levelsprice,
      city,
      type
    });
    req.session.user = user._id;
    res.json({ user });
  } catch (error) {
    console.log(error);

    next(error);
  }
});

router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) throw new Error("There's no user with that email.");
    const result = await bcryptjs.compare(password, user.passwordHash);
    if (!result) throw new Error("Wrong password.");
    req.session.user = user._id;
    res.json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/sign-out", (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;
