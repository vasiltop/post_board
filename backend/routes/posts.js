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

router.get('/:postId', verify, async (req, res) => {
    const post = await Post.findById({_id: req.params.postId});

    res.send({
        success: true,
        postData: post
    });

});

router.post('/create', verify, async (req, res) => {
    const {error} = postValidation(req.body);
    if(error) return res.send({
        err: error.details[0].message,
        success: false
    });
    
    const n = await User.findById({_id: req.user._id});
    
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        userId: req.user._id,
        userName: n.name
    });

    try { 
        const savedPost = await post.save();
        res.send({success: true});
    } catch (error) {
        res.send({
            err: error,
            success: false
        });
    };
});


module.exports = router;