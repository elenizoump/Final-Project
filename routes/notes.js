const { Router } = require("express");
const router = new Router();
const User = require("./../models/user");
const Note = require("../models/note");

/*
router.get('/list', (req, res, next) => {
  Note.find()
    .then(notes => {
      res.json({ notes });
    })
    .catch(error => {
      next(error);
    });
});
*/

router.get("/list/:receiver", async (req, res, next) => {
  const userId = req.session.user;
  const receiverId = req.params.receiver;
  console.log(receiverId);
  if (!userId) {
    res.sendStatus(401);
  } else {
    try {
      const user = await User.findById(userId).exec();
      const notes = await Note.find({
        $or: [
          { _author: userId, _receiver: receiverId },
          { _author: receiverId, _receiver: userId }
        ]
      })
        .populate("_author _receiver")
        .exec();
      res.json(notes);
    } catch (error) {
      next(error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id).exec();
    res.json({ note });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, {
      ...(title && { title }),
      ...(content ? { content } : {})
    }).exec();
    res.json({ note });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id).exec();
    res.json({});
  } catch (error) {
    next(error);
  }
});

const multerMiddleware = require("./../middleware/Upload");

router.post("/create", async (req, res, next) => {
  const content = req.body.content;
  const receiverId = req.body.receiver;
  const userId = req.session.user;
  console.log(receiverId, userId);
  if (!userId) {
    res.sendStatus(401);
  } else {
    try {
      // const note = await Note.create({ title, body }).exec();
      const user = await User.findById(userId).exec();
      const note = await Note.create({
        content: content,
        // image: req.file.url,
        _author: user._id,
        _receiver: receiverId
      });
      res.json(note);
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
