const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const buyerModel	= require.main.require('./models/buyerModel');
const freelancerModel = require.main.require('./models/freelancerModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index')
})

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(status){ //using usermodel to validate with the database
		if(status){
			res.cookie('uname', req.body.username);
			res.redirect('/home');	
		}else{
			buyerModel.validate(user, function(status){ //need to make and work on buyerModel
				if(status){
					res.cookie('uname', req.body.username);
					res.redirect('/');	//send to buyer home.ejs
				}else
					{
					freelancerModel.validate(user, function(status){ //need to make and work on freelancer model
						if(status){
							res.cookie('uname', req.body.username);
							res.redirect('/');	// send to freelancer home.ejs
						}else{
							res.redirect('/login');
						}
					});
					
				}
			});
			// res.redirect('/login');
		}
	});


	
	

})

module.exports = router;