const express = require('express');
const userModel	= require.main.require('./models/userModel');
const buyerModel	= require.main.require('./models/buyerModel');
const freelancerModel	= require.main.require('./models/freelancerModel');
const router = express.Router();

router.get('/create', (req, res)=>{
	res.render('user/create'); 
})

router.post('/create', (req, res)=>{

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
console.log(user);
if (user.member=="buyer" )
{    
buyerModel.insert(user, function(status){ //using usermodel to validate with the database
	console.log("inside the if for buyer"); 
	if(status){
			console.log("inside the insert for buyer"); 
			//res.cookie('uname', req.body.username);
			buyerModel.getAll(function(results){
			res.render('adBuyerlist/adminBuyerlist',{userlist: results});//need to change	 // check if i can send an alert or not for insertion done
			});
		}else{
			res.redirect('/user/create');
		}
	});
}
else if(user.member=="freelancer"){  
    freelancerModel.insert(user, function(status){ //using usermodel to validate with the database
		console.log("inside the if for freelancer"); 
		if(status){
			console.log("inside the inser for freelancer"); 
			//res.cookie('uname', req.body.username);
			freelancerModel.getAll(function(results){
			res.render('adFreelancerlist/adminFreelancerlist',{userlist: results});
			});//need to change	 // check if i can send an alert or not
		}else{
			res.redirect('/user/create');
		}
    });
}
else if(user.member=="admin"){ 
	userModel.insert(user, function(status){
		console.log("inside the if for admin"); 
		if(status){
			console.log("inside the inser for admin"); 
			userModel.getAll(function(results){
			//alert("insertion done");
			res.render('home/userlist',{userlist: results});// need to change
			});
		}else{
			//alert("insertion failed as similar username exists");
			
			res.redirect('/user/create');
		}
	});
}

})


router.get('/edit/:id', (req, res)=>{

	//var data = req.params.id;
	//res.send(data);
	a_id = req.params.id;
	console.log(a_id);
	userModel.getById(req.params.id, function(results){
	console.log("obj",results);

	//console.log("fname",results[fname]);
	
		// var user = {
		// 	id : a_id,
		// 	fname: results[0].fname,
		// 	username: results[0].uname,  //fname, uname, pass, pass2, email, phone, address1, member(freelancer/buyer) 
		// 	password: results[0].pass,
		// 	email:    results[0].email, 
		// 	phone:    results[0].phone,
		// 	address:  results[0].address1
		// 	//member: result.member
		// 	 // need to check for radio button
		// 	};
		// 	console.log(user);
		
			res.render('user/edit', {userlist:results});
			 //console.log(userlist);
	});
	


	// res.render('user/edit', user);
})


router.post('/edit/:id', (req, res)=>{
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
	userModel.update(user, function(status){
		if(status){
			userModel.getAll(function(results){
			res.render('home/userlist',{userlist: results});// need to change the path
		});}
		else{
			res.redirect('user/create');
		}
	});

})

router.get('/delete/:id', (req, res)=>{
	// a_id = req.params.id;
	// console.log(a_id);
	userModel.getById(req.params.id, function(results){
	console.log("obj",results);		
			res.render('user/delete', {userlist:results});
			 //console.log(userlist);
	});
	
})

router.post('/delete/:id', (req, res)=>{
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
	console.log ("delete", user);
	userModel.delete(user, function(status){
		if(status){
			console.log("deletion of admin done" );
			userModel.getAll(function(results){
				res.render('home/userlist',{userlist: results});// need to change the path
			});

			//res.render('home/userlist');// need to change the path
		}else{
			res.redirect('/user/create');
		}
	});
	//delete from DB
	// res.redirect('/home/userlist');
})



router.get('/search/:key', (req, res)=>{

	var searchkey = req.params.key;

	//database query
	// response json send

	//res.json({userlist: result});
	//res.redirect('/home/12');
})

module.exports = router;


//validation -> express-validator (https://www.npmjs.com/package/express-validator)
//file upload -> express-fileupload (https://www.npmjs.com/package/express-fileupload)
