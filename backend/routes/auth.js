const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken')

router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body);
    if(error) return res.send(
        {
            success: false,
            err: error.details[0].message
        }
    );


    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.send(
        {
            success: false,
            err: "This email already exists."
        }
    );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try { 
        const savedUser = await user.save();
        res.send(
            {
                success: true,
                user: user._id
            }
            );
    } catch (error) {
        res.send(
            {
                success: false,
                err: error.details[0].message
            });
    }

});

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.send({
        success: false,
        err: error.details[0].message
    });
    

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.send({
        success: false,
        err: "Email or Password is incorrect."
    });

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.send({
        success: false,
        err: "Email or Password is incorrect."
    });

    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
    res.send({
        success: true,
        jwt: token
    });
    
});

router.get('/me', verify, async (req, res) => {
    const user = await User.findById({_id: req.user._id})
    res.send(
        {
            user : user,
            success: true
        });
});

router.get('/info/:userId', async (req, res) => {

    try {
        const user = await User.findById({_id: req.params.userId});

        res.send({
            user: user,
            success: true
        });
    } catch(err) {
        res.send({
            success: false
        });
    }
    
}),

module.exports = router;