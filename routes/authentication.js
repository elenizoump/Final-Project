"use strict";

const { Router } = require("express");
const router = new Router();
const User = require("./../models/user");
const bcryptjs = require("bcryptjs");
const uploadCloud = require("./../middleware/Upload");

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
      const newEmail = req.body.email;
      const newInstrumentname = req.body.name;
      const newLevelsname = req.body.name;
      const newCity = req.body.name;

      const user = await User.findByIdAndUpdate(userId, {
        name: newName
        // email: newEmail,
        // instrumentname: newInstrumentname,
        // levelsname: newLevelsname,
        // city: newCity
      }).exec();
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
});

// router.get('/uploadPhoto/:id', (req, res, next) => {
//   res.render('uploadProfilePhoto');
// });

// router.post('/photoUpload/:id', uploadCloud.single('photo'), (req, res, next) => {
//   const id = req.params.id;
//   console.log(req.file);

//   User.findByIdAndUpdate(id, {
//           photo: req.file.url
//       })
//       .then(user => {
//           res.redirect('/profile/' + user._id);
//       })
//       .catch(error => {
//           next(error);
//       });
// });

//teacher sign-up
// router.get("/teacher/:id", async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id).exec();
//     res.json(user);
//   } catch (error) {
//     console.log("Error on the GET STUDENT", error);
//     next(error);
//   }
// });

router.post("/sign-up", async (req, res, next) => {
  console.log("signup teacher route====================>", req.body);

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
