"use strict";

const { Router } = require("express");
const router = new Router();
const User = require("./../models/user");
const bcryptjs = require("bcryptjs");

router.post("/sign-up", async (req, res, next) => {
  const { name, email, address, image, password, age, city, instruments, description } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
        name,
        email,
        passwordHash: hash,
        address,
        image,
        age,
        city,
        instruments,
        description
      });
    req.session.user = user._id;
    res.json({ user });
  } catch (error) {

    next(error);
  }
});

router.post("/sign-up-teacher", async (req, res, next) => {
  const { name, email, address, image, password, levels, gender, age, city, description } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
        name,
        email,
        passwordHash: hash,
        address,
        image,
        age,
        city,
        levels,
        gender,
        description
      });
      req.session.user = user._id;
      res.json({ user });
    } catch (error) {
      next(error);
    }
  });

  router.post('/sign-in', async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) throw new Error("There's no user with that email.");
      const result = await bcryptjs.compare(password, user.passwordHash);
      if (!result) throw new Error('Wrong password.');
      req.session.user = user._id;
      res.json({ user });
    } catch (error) {
      next(error);
    }
  });

router.post("/sign-out", (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;
