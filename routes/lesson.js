"use strict";

const { Router } = require("express");
const router = new Router();
const User = require("./../models/user");
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
  const userId = req.session.user;
  if (!userId) {
    res.sendStatus(401);
  } else {
    const instrument = req.body.instrument;
    const hours = req.body.hoursOfStudy;
    const teacherId = req.body.teacherId;

    try {
      // const note = await Note.create({ title, body }).exec();
      const user = await User.findById(userId).exec();
      const teacher = await User.findById(teacherId).exec();
      const lesson = await Lesson.create({
        instrument: instrument,
        hoursOfStudy: hours,
        _student: user._id,
        _teacher: teacher._id
      });
      res.json({ lesson });
    } catch (error) {
      next(error);
    }
  }
});

router.get("/viewAllLessons", async (req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    res.sendStatus(401);
  } else {
    try {
      const user = await User.findById(userId).exec();
      const userType = user.type;
      let lessons;
      if (userType === "teacher") {
        lessons = await Lesson.find({ _teacher: userId }).exec();
      } else if (userType === "student") {
        lessons = await Lesson.find({ _student: userId }).exec();
      }
      res.json(lessons);
    } catch (error) {
      next(error);
    }
  }
});

// router.get("/selectTeacher", async (req, res, next) => {
//   try {
//     const users = await User.find().exec();
//     res.json({ users });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/lesson/:lessonId", async (req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    res.sendStatus(401);
  } else {
    try {
      const user = await User.findById(userId).exec();
      const lesson = await Lesson.findById(req.params.lessonId).exec();
      if (
        (lesson._student &&
          lesson._student.toString() === user._id.toString()) ||
        (lesson._teacher && lesson._teacher.toString() === user._id.toString())
      ) {
        res.json(lesson);
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      next(error);
    }
  }
});

// router.get("/lesson/:lessonId", async (req, res, next) => {
//   const userId = req.session.user;
//   console.log("IS THIS SOMETHING", req.params.id);
//   if (!userId) {
//     res.sendStatus(401);
//   } else {
//     try {
//       const lesson = await Lesson.findById(req.params.lessonId).exec();
//       if (lesson._student === userId || lesson._teacher === userId) {
//         res.json(lesson);
//       } else {
//         res.sendStatus(401);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// });

// router.patch("/:id", async (req, res, next) => {
//   const { instrument, hoursOfStudy } = req.body;
//   try {
//     const lesson = await Lesson.findByIdAndUpdate(req.params.id, {
//       ...(instrument && { instrument }),
//       ...(hoursOfStudy ? { hoursOfStudy } : {})
//     }).exec();
//     res.json({ lesson });
//   } catch (error) {
//     next(error);
//   }
// });

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
