const router = require('express').Router();

const postCtrl = require('../controllers/posts');


router.get('/', postCtrl.post_index_get);
router.get('/new', postCtrl.post_create_get);
router.post('/', postCtrl.post_create_post);

module.exports = router;
