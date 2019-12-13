"use strict";

const { Router } = require("express");
const router = new Router();

const Lesson = require("./../models/Lesson");

/*
router.get('/list', (req, res, next) => {
  Note.find()
    .then(lesson => {
      res.json({ notes });
    })
    .catch(error => {
      next(error);
    });
});
*/

router.get("/list", async (req, res, next) => {
  try {
    const lesson = await Lesson.find().exec();
    res.json({ lesson });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .exec()
      .populate("");
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
      student: creator
    };
    const lesson = await Lesson.create(data);
    res.json({ lesson });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
