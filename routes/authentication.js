"use strict";

const { Router } = require("express");
const router = new Router();
const User = require("./../models/user");
const bcryptjs = require("bcryptjs");
const uploadCloud = require('./../middleware/Upload');

//student Sign-Up
// router.get("/student/:id", async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id).exec();
//     res.json(user);
//   } catch (error) {
//     console.log("Error on the GET STUDENT", error);
//     next(error);
//   }
// });

router.get("/user", async (req, res, next) => {
  // if (req && req.session && req.session.user) {
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

router.post("/sign-up", async (req, res, next) => {
  console.log("signup route====================>", req.body);

  const {
    name,
    email,
    password,
    type
    // streetname,
    // image,
    // age,
    // city,
    // instruments,
    // description,
    // postcode,
    // housenumber
  } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      type
      // streetname,
      // image,
      // age,
      // city,
      // instruments,
      // description,
      // postcode,
      // housenumber,
    });
    req.session.user = user._id;
    res.json({ user });
  } catch (error) {
    console.log(error);

    next(error);
  }
});

router.get('/uploadPhoto/:id', (req, res, next) => {
  res.render('uploadProfilePhoto');
});

router.post('/photoUpload/:id', uploadCloud.single('photo'), (req, res, next) => {
  const id = req.params.id;
  console.log(req.file);

  User.findByIdAndUpdate(id, {
          photo: req.file.url
      })
      .then(user => {
          res.redirect('/profile/' + user._id);
      })
      .catch(error => {
          next(error);
      });
});

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

router.post("/sign-up/teacher", async (req, res, next) => {
  console.log("signup teacher route====================>", req.body);

  const {
    name,
    email,
    password,
    type
    // streetname,
    // postcode,
    // housenumber,
    // image,
    // levels,
    // gender,
    // age,
    // city,
    // description,
  } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      type
      // streetname,
      // image,
      // age,
      // city,
      // levels,
      // gender,
      // description,
      // postcode,
      // housenumber
    });
    req.session.user = user._id;
    res.json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//user sign-in
// router.get(`/:userType/:id`, async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     //const userType = user.type;
//     const userType = req.params.userType;
//     const user = await User.findById(userId).exec();
//     res.json(user);
//   } catch (error) {
//     console.log("Error on the GET STUDENT", error);
//     next(error);
//   }
// });

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
