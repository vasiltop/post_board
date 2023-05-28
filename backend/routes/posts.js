const router = require('express').Router();
const verify = require('./verifyToken')
const Post = require('../model/Post');
const User = require('../model/User');
const {postValidation} = require('../validation');

router.get('/', verify, async (req, res) => {

    const posts = await Post.find();
    

    const mapped = posts.map(p => {
        let a = p.toObject();
        a.liked = a.likes.includes(req.user._id);
        a.likes = a.likes.length;
        
        

        return a;
    });

    
    res.send({
        postList: mapped,
        success: true
    });

});

router.get('/:postId', verify, async (req, res) => {

    try {
        const post = await Post.findById({_id: req.params.postId});
    
        let p = post.toObject();
        p.liked = p.likes.includes(req.user._id);
        p.likes = p.likes.length;
        
        

        res.send({
            success: true,
            postData: p
        });
    } catch (error) {
        res.status(404).send();
    }
    

});

router.get('/:postId/like', verify, async (req, res) => {
    const post = await Post.updateOne({_id: req.params.postId}, { $addToSet: {likes: req.user._id}});

    if(!post.matchedCount) {
        return res.status(404).send();
    }

    if(!post.modifiedCount) {
        return res.status(204).send();
    }

    res.send();

});

router.get('/:postId/unlike', verify, async (req, res) => {
    const post = await Post.updateOne({_id: req.params.postId}, { $pull: {likes: req.user._id}});

    if(!post.matchedCount) {
        return res.status(404).send();
    }

    if(!post.modifiedCount) {
        return res.status(204).send();
    }

    res.send();
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
        userName: n.name,
        likes: []
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