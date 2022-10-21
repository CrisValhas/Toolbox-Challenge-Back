const router = require('express').Router();

const notFound = require('../middleware/notFoundHandler');
const {challenge,getApiList} = require('../controllers/controllers');

router.use('/files/data', challenge);
router.use('/files/list', getApiList);
router.use('*', notFound);

module.exports = router;