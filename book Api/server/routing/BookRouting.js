const express = require('express');
const { store, index, update, trash, single } = require('../controller/BookController');
const router = express.Router();

router.post('/data', store)
router.get('/', index)
router.put('/:id', update)
router.delete('/:id', trash)
router.get('/:id', single)
module.exports = router