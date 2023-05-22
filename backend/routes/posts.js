const router = require('express').Router();
const verify = require('./verifyToken')
const Post = require('../model/Post');
const User = require('../model/User');
const {postValidation} = require('../validation');

router.get('/', verify, async (req, res) => {
    const posts = await Post.find();
    
    res.send({
        postList: posts,
        success: true
    });

});

router.post('/create', verify, async (req, res) => {
    const {error} = postValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const n = await User.findById({_id: req.user._id});
    
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        userName: n.name
    });

    try { 
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;