const router = require('express').Router();
const User =  require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } =  require('../validation');




router.post('/register', async (req, res) => {

    //Lets validate the data before we a User
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Checking if User is already in the DB
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists!')

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.send({user: user._id});

    }catch {
        res.status(400).send(err);
    }

});

//LOGIN
router.post('/login', async (req,res) => {

    //Lets validate the data before we a User
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is wrong!')

    //Check Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).status(200)

    // store posted data in the session
    req.session.token = token;
    req.session.user = req.body.email;
    res.status(200).send('successfull Login')
     
     
});




module.exports = router;