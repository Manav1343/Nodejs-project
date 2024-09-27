const express = require('express');
const router = express.Router();
const movieStore = require('../controller/movieController');
const upload = require('../util/upload');

router.post('/', upload.single('movieposter'),movieStore.store)
router.get('/:id',movieStore.trash)

module.exports=router;