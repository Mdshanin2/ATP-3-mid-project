const express 	= require('express');
const buyerModel	= require.main.require('./models/buyerModel');
const freelancerModel	= require.main.require('./models/freelancerModel');
const router 	= express.Router();
const bodyParser 	= require('body-parser');
const { body, validationResult } = require('express-validator');
var urlencodedParser = bodyParser.urlencoded({extended: false })
//var popup = require('popups'); 
//let alert = require ('alert');

router.get('/', (req, res)=>{
	res.render('register/register');
})



router.post('/',urlencodedParser,[
	// username must be an email
	body('email','error email').isEmail(),
	// password must be at least 3 chars long
	body('pass','password length must atleast be 3 ').isLength({ min: 3 }),
	body('phone','length of your phone must be 11').isLength(11)
  ], (req, res)=>{ // needs work

const errors = validationResult(req);
console.log(errors.mapped());
  if (!errors.isEmpty()) {
	//alert(errors.email.msg );
	res.render('register/register',{title:"user details", errors:errors.mapped()});
	//return res.status(400).json({ errors: errors.array() });
}
else{var user = {
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
console.log(user);
if (user.member=="buyer" )
{    
buyerModel.insert(user, function(status){ //using usermodel to validate with the database
		if(status){
			//res.cookie('uname', req.body.username);
            res.render('login/index');	 // check if i can send an alert or not for insertion done
		}else{
			res.redirect('/register/register');
		}
	});
}
if(user.member=="freelancer"){  
    freelancerModel.insert(user, function(status){ //using usermodel to validate with the database
		if(status){
			//res.cookie('uname', req.body.username);
            res.render('login/index');	 // check if i can send an alert or not
		}else{
			res.redirect('/register/register');
		}
    });
}

}
});

module.exports = router;