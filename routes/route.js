const router = require('express').Router();


router.get('/', (req,res) => {
    res.render('index', {title: 'hbs title'});
})

router.get('/profile', (req,res) => {
    res.render('profile', {title: 'Profile'});
})

module.exports = router;