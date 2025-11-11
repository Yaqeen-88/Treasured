const router = require('express').Router();

const postCtrl = require('../controllers/posts');


router.get('/', postCtrl.post_index_get);
router.get('/new', postCtrl.post_create_get);
router.post('/', postCtrl.post_create_post);

router.get('/:postId', postCtrl.post_show_get);
router.get('/:postId/edit', postCtrl.post_edit_get);
router.put('/:postId', postCtrl.post_update_put);
router.delete('/:postId', postCtrl.post_delete_delete);

router.post('/:postId/likes/:userId', postCtrl.like_create_post);
router.delete('/:postId/likes/:userId', postCtrl.like_delete_delete);


module.exports = router;
