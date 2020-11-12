const express = require('express');
const {check} = require('express-validator');
const fileUpload = require("../middleware/fileUpload");
const auth = require('../middleware/auth');
const { createStory, getStories, getStoriesByUser } = require('../controllers/storycontroller');

const router = express.Router();

router.get('/', getStories);
router.get('/:sid', getStoriesByUser);

router.use(auth);

router.post('/',
fileUpload.single('image'),
[
    check("caption").notEmpty(),
    check("storyUrl").notEmpty(),
  ],
createStory);

module.exports = router