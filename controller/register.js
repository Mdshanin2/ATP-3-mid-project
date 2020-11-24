const express 	= require('express');
const buyerModel	= require.main.require('./models/buyerModel');
const freelancerModel	= require.main.require('./models/freelancerModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('register/register')
})

router.post('/', (req, res)=>{ // needs work
// req.check('email','invalid email address').isEmail();
// req.check('pass','password is invalid').isLength({min:4}).equals(req.body.pass2);
// var errors = req.validationErrors();
// if (errors){
// 	req.exsession.errors = errors;
// }	
var user = {
        fname: req.body.fname,
        username: req.body.uname,  //fname, uname, pass, pass2, email, phone, address1, member(freelancer/buyer) 
        password: req.body.pass,
        email:    req.body.email, 
        phone:    req.body.phone,
        address:  req.body.address1, 
        member: req.body.member
         // need to check for radio button
	};
//need to get the member if member = buyer then sent to buyermodel else, freelancer model
console.log(user.member);
if (user.member=="buyer" )
{    
buyerModel.insert(user, function(status){ //using usermodel to validate with the database
		if(status){
			//res.cookie('uname', req.body.username);
            res.render('login');	 // check if i can send an alert or not for insertion done
		}else{
			res.redirect('/register');
		}
	});
}
if(user.member=="freelancer"){  
    freelancerModel.insert(user, function(status){ //using usermodel to validate with the database
		if(status){
			//res.cookie('uname', req.body.username);
            res.render('login');	 // check if i can send an alert or not
		}else{
			res.redirect('/register');
		}
    });
}
})

module.exports = router;