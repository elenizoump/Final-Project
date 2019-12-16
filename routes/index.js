"use strict";

const { Router } = require("express");
const router = new Router();
const routeGuard = require("./../middleware/route-guard");
const User = require("./../models/user");

router.get("/", (req, res, next) => {
  res.json({ type: "success", data: { title: "Hello World" } });
});

router.get("/private", routeGuard, (req, res, next) => {
  res.render("private");
});

router.get("/viewAllTeachers", async (req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    res.sendStatus(401);
  } else {
    try {
      const teachers = await User.find({ type: "teacher" }).exec();
      res.json(teachers);
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
