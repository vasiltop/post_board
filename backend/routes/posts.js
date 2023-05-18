const router = require('express').Router();
const verify = require('./verifyToken')
const Post = require('../model/Post');
const {postValidation} = require('../validation');

router.get('/', verify, async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

router.post('/create', verify, async (req, res) => {
    const {error} = postValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    try { 
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;