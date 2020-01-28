const router = require('express').Router();
const User =  require('../model/User');


router.get('/admin', (req, res) => {
    // force users to deal with /category first
    if (req.session.token) {
        return res.redirect('/admin');
    }
    res.render('admin', {
        title: 'Admin Login'
    });
})

router.get('/', (req, res) => {
    // force users to deal with /category first
    res.render('index', {
        title: 'normal view'
    });
})

router.get('/profile', async (req, res) => {

    // force users to deal with /category first
    if (!req.session.token) {
        return res.redirect('/');
    }

    // get data from the session
    // var token = req.session.token;

    const getUser = await User.findOne({email: req.session.user});

    res.render('profile', {
        title: 'Profile',
        getUser: getUser
    });

})

module.exports = router;