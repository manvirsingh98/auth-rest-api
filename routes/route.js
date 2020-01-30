const router = require('express').Router();
const User = require('../model/User');
const WebsiteData = require('../model/WebsiteData');
const jwt = require('jsonwebtoken');


//Admin View
router.get('/login', (req, res) => {
    if (req.session.token) {
        return res.redirect('/admin');
    }
    res.render('login', {
        title: 'Admin Login'
    });
})

//Admin Profile
router.get('/profile', async (req, res) => {

    // force users to deal with /category first
    if (!req.session.token) {
        return res.redirect('/');
    }

    //Decode the _id from token
    const user = jwt.decode(req.session.token, process.env.TOKEN_SECRET);
    console.log(user);

    // get data from the session
    // var token = req.session.token;
    const getUser = await User.findOne({
        _id: user._id
    });




    //Render and pass value to page
    res.render('profile', {
        title: 'Profile',
        getUser: getUser    });

});



//Index Page
router.get('/', async (req, res) => {

    const id = "5e330c4e9464f181c43b9869";
    const getData = await WebsiteData.findOne({_id:id});
    console.log(getData);

    res.render('index', {
        title: 'normal view',
        getData: getData

    });
})

router.post('/add', async (req, res) => {

    //Add a Website data
    const websiteData = new WebsiteData({
        title: req.body.title,
        desc: req.body.desc
    });

    try {
        const saveWebsite = await websiteData.save();
        res.send("saved");

    } catch (err) {
        res.status(400).send(err);
    }
});


router.put('/update/:id', function (req, res) {
    let id = req.params.id;
    var data = {
        title: req.body.title,
        desc: req.body.desc,
    }
    
    // update the website data
    WebsiteData.findByIdAndUpdate(id, data, function (err, employee) {
        if (err) throw err;
        res.send('Successfully updated');
    });
});


module.exports = router;