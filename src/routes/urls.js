const router = require('express').Router();
const controller = require('../controllers/url');

router.route('/').post(controller.createUrl);
router.route('/').get(controller.all);


module.exports = router;
