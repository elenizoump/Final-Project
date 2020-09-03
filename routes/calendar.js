"use strict";

const { Router } = require("express");
const router = new Router();
const User = require("./../models/user");
const Calendar = require("./../models/Calendar");


router.post("/create", async (req, res, next) => {

  console.log("REQ BODY CALENDAR", req.body.calendar);
  console.log("CALENDAR CREATE teacherId", req.session.user);

  const teacherId = req.session.user;
  if (!teacherId) {
    res.sendStatus(401);
  } else {
    const availableDays = req.body.calendar;
    // checking to see if I have a calendar in DB with the ID matching the one with _teacher
    const calendarFromDatabase = await Calendar.findOne({
      _teacher: teacherId
    });
    if (!calendarFromDatabase) {
      try {
        const calendar = await Calendar.create({
          _teacher: teacherId,
          availableDays: availableDays
        });
        res.json({ calendar });
      } catch (error) {
        console.log(error);
        next(error);
      }
    } else {
      try {
        const calendar = await Calendar.findOneAndUpdate(
          {
            _teacher: teacherId
          },
          {
            availableDays: availableDays
          }
        );
        res.json({ calendar });
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  }

  //check if there is already a calendar before creating, just update
});

router.get("/viewAllCalendars", async (req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    res.sendStatus(401);
  } else {
    try {
      const user = await User.findById(userId).exec();
      const userType = user.type;
      let calendars;
      if (userType === "teacher") {
        calendars = await Calendar.find({ _teacher: userId }).exec();
      } else if (userType === "student") {
        calendars = await Calendar.find({ _student: userId }).exec();
      }
      res.json(calendars);
    } catch (error) {
      next(error);
    }
  }
});


router.get("/my-calendar", async (req, res, next) => {
  const userId = req.session.user;
  console.log(userId);
  try {
    const calendar = await Calendar.findOne({
      _teacher: userId
    });
    res.json({ calendar });
  } catch (error) {
    next(error);
  }
});

router.get("/:teacherId", async (req, res, next) => {
  const userId = req.session.user;
  const teacherId = req.params.teacherId;

  console.log(teacherId);
  if (!userId) {
    res.sendStatus(401);
  } else {
    try {
    
      const calendar = await Calendar.findOne({ _teacher: teacherId }).exec();
      res.json(calendar);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Calendar.findByIdAndRemove(req.params.id).exec();
    res.json({ message: "calendar deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
