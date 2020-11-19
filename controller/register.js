const express 	= require('express');
const userModel	= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('register/register')
})

router.post('/', (req, res)=>{ // needs work

	var user = {
        fname: req.body.fname,
        username: req.body.uname,  //fname, uname, pass, pass2, email, phone, address1, member(freelancer/buyer) 
        password: req.body.pass,
        email:    req.body.email, 
        phone:    req.body.phone,
        address:  req.body.address1, 
        member: req.body.member // need to check for radio button
	};

	userModel.insert(user, function(status){ //using usermodel to validate with the database
		if(status){
			//res.cookie('uname', req.body.username);
            res.redirect('/login');	 // check if i can send an alert or not
		}else{
			res.redirect('/register');
		}
	});

})

module.exports = router;