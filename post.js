const router = require('express').Router();
const verify = require('./verifyToken');
const User =  require('./model/User');

router.get('/', verify, async (req,res) => {
    // res.json({
    //     posts: {
    //         title: 'my first post',
    //         description: 'Random data you shouldnt access'
    //     }
    // });
  const getUser = await User.findOne({_id: req.user});
  res.send(getUser)
});



module.exports = router;