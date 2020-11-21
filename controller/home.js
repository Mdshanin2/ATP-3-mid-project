const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	//res.render('home/index');// remove it after you have done your work


	if(req.cookies['uname'] != null){
		res.render('home/index');
	}else{
		res.redirect('/login');
	}
})

router.get('/info', (req, res)=>{
	
	//res.render('home/index');// remove it after you have done your work
	userModel.getByname(req.cookies['uname'],function(results){
		res.render('home/admin_info', {userlist: results});
	});


	// if(req.cookies['uname'] != null){
	// 	res.render('home/index');
	// }else{
	// 	res.redirect('/login');
	// }
})

router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/userlist', {userlist: results});
	});

});

module.exports = router;