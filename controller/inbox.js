const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const buyerModel	= require.main.require('./models/buyerModel');
const freelancerModel	= require.main.require('./models/freelancerModel');
const inbox	= require.main.require('./models/inboxModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	res.render('home/index');// remove it after you have done your work


	// if(req.cookies['uname'] != null){
	// 	res.render('home/index');
	// }else{
	// 	res.redirect('/login');
	// }
});

router.get('/info', (req, res)=>{
	
	//res.render('home/index');// remove it after you have done your work
	userModel.getByname(req.cookies['uname'],function(results){
		res.render('home/admin_info', {userlist: results});
	});
	
});
router.post('/info', (req, res)=>{
	
	var user = {
        fname: 	  req.body.fname,
        username: req.body.uname,  //fname, uname, pass, pass2, email, phone, address1, member(freelancer/buyer) 
        password: req.body.pass,
        email:    req.body.email, 
        phone:    req.body.phone,
        address:  req.body.address1
        //member: req.body.member
         // need to check for radio button
	};
	console.log(user);
	//console.log(req.body);
	//res.render('home/index');// remove it after you have done your work
	
	 userModel.update(user,function(status){
		if(status){
			userModel.getByname(user.username,function(results){
			//alert("user info updated");
			res.render('home/admin_info', {userlist: results});
			});// need to change the path
		}else{
			//alert("something wrong cannot update");
			res.redirect('/home/info');
		}
    });
		
	
});


router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/userlist', {userlist: results});
	});

});
module.exports = router;