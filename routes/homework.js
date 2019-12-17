const { Router } = require('express');
const router = new Router();
const User = require("./../models/user");
const Homework = require('../models/homework');

/*
router.get('/list', (req, res, next) => {
  Homework.find()
    .then(notes => {
      res.json({ notes });
    })
    .catch(error => {
      next(error);
    });
});
*/

router.get('/homeworkList', async (req, res, next) => {
  try {
    const homeworks = await Homework.find().exec();
    res.json({ homeworks });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const homework = await Homework.findById(req.params.id).exec();
    res.json({ homework });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const { content } = req.body;
  try {
    const homework = await Homework.findByIdAndUpdate(req.params.id, {
      ...(content ? { content } : {})
    }).exec();
    res.json({ homework });
  } catch (error) {
    next(error);
  }
});


const multerMiddleware = require('./../middleware/Upload');

router.post('/homework', multerMiddleware.single('image'), async (req, res, next) => {
  console.log("REQ BODYYYYY", req.body);
  console.log(req.file);
  // const { title, body } = req.body;
  const userId = req.session.user;
  const content = req.body.content;
  try {
    // const note = await Homework.create({ title, body }).exec();
    const user = await User.findById(userId).exec();
    res.json(user);
    const data = {
      content: content,
      image: req.file.url,
      
    };
    const note = await Homework.create(data);
    res.json({ note });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;