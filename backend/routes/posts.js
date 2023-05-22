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
    if(error) return res.send({
        error: error.details[0].message,
        success: false
    });
    
    const n = await User.findById({_id: req.user._id});
    
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        userName: n.name
    });

    try { 
        const savedPost = await post.save();
        res.send({success: true});
    } catch (err) {
        res.send({
            error: err,
            success: false
        });
    };
});


module.exports = router;