"use strict";

const { Router } = require("express");
const router = new Router();
const Lesson = require("./../models/Lesson");

/* router.get("/list", (req, res, next) => {
  Lesson.find()
    .then(lessons => {
      res.json({ lessons });
    })
    .catch(error => {
      next(error);
    });
}); */

router.post("/create", async (req, res, next) => {
  // const { title, body } = req.body;
  const instrument = req.body.instrument;
  const hours = req.body.hoursOfStudy;
  const creator = req.session.user;

  try {
    // const note = await Note.create({ title, body }).exec();
    const data = {
      instrument: instrument,
      hoursOfStudy: hours,
      _student: creator
    };
    const lesson = await Lesson.create(data);
    console.log("ROUTE: ", lesson);
    res.json({ lesson });
  } catch (error) {
    next(error);
  }
});

router.get("/viewAllLessons", async (req, res, next) => {
  try {
    const lessons = await Lesson.find().exec();
    res.json({ lessons });
  } catch (error) {
    next(error);
  }
});

router.get("/selectTeacher", async (req, res, next) => {
  try {
    const users = await User.find().exec();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .exec()
      .populate("_student", "_teacher");
    res.json({ lesson });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { instrument, hoursOfStudy } = req.body;
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, {
      ...(instrument && { instrument }),
      ...(hoursOfStudy ? { hoursOfStudy } : {})
    }).exec();
    res.json({ lesson });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Lesson.findByIdAndRemove(req.params.id).exec();
    res.json({ message: "lesson deleted" });
  } catch (error) {
    next(error);
  }
});

//const multerMiddleware = require('./../../middleware/multer-configuration');

module.exports = router;
