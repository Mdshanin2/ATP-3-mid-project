const express 	= require('express');
//const userModel = require.main.require('./models/userModel');
//const buyerModel	= require.main.require('./models/buyerModel');
//const freelancerModel	= require.main.require('./models/freelancerModel');
const inboxModel = require.main.require('./models/freelancer_inboxModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	//res.render('home/inbox');// remove it after you have done your work
var you = "you";
	inboxModel.getByname(req.cookies['uname'],function(results){
		res.render('home/inbox', {userlist: results});
	});

// inboxModel.getByname(req.cookies['uname'],function(results){
	// 	res.render('home/inbox', {userlist: results});
	// });
	
	// if(req.cookies['uname'] != null){
	// 	res.render('home/index');
	// }else{
	// 	res.redirect('/login');
	// }
});



router.get('/reply/:name', (req, res)=>{
	// a_id = req.params.id;
	// console.log(a_id);
	
	console.log("uname",req.params.name);	
	console.log("Admin_username",req.cookies['uname']);	


	inboxModel.getbytwoUsername(req.cookies['uname'],req.params.name, function(results){
	console.log("obj",results);	
	res.render('home/freelancer_inboxInside', {userlist: results});	
    
	});
	
})


router.post('/reply/:name', (req, res)=>{
	// a_id = req.params.id;
	// console.log(a_id);
	//console.log("uname",req.params.name);	
	console.log("Admin_username",req.cookies['uname']);	
	var d = new Date();
	// var y = "You"
	var user = {
		        message: 	  	req.body.mes,
		        sysdate: 		d,
			    you:		 	req.cookies['uname'],
			    admin: 			req.params.name,
			    reply: 			req.cookies['uname']
		      
			};


	inboxModel.insert(user, function(results){

		inboxModel.getbytwoUsername(req.cookies['uname'],req.params.name, function(results){
		console.log("objtttttt",results);	
		res.render('home/freelancer_inboxInside', {userlist: results});	
		});
	});
	
})


// router.get('/delete/:id', (req, res)=>{
// 	// a_id = req.params.id;
// 	// console.log(a_id);
// 	inboxModel.getById(req.params.id, function(results){
//     console.log("obj",results);		
//     var user = {
// 			id : req.params.id,
// 			message: results[0].message,
// 			username: results[0].username,  //fname, uname, pass, pass2, email, phone, address1, member(freelancer/buyer) 
// 			id_u: results[0].id,
			
// 			//member: result.member
// 			 // need to check for radio button
//             };
//             console.log("user",user);	
//         inboxModel.delete(user, function(status){
// 		if(status){
// 			console.log("username",user.username);
//            		inboxModel.getNotByname(req.cookies['uname'],function(result){
// 					console.log("chathkjhkjh",result);
// 					res.render('home/inbox', {userlist: result});
// 				});
        
// 			//res.render('adFreelancerlist/adminFreelancerlist');// need to change the path
// 		}else{
// 			res.redirect('/home/inbox');
// 		}
// 	});
// 			//res.render('/adBuyerlist/delete', {userlist:results});
// 			 //console.log(userlist);
// 	});
	
// })
// router.get('/info', (req, res)=>{
	
// 	//res.render('home/index');// remove it after you have done your work
// 	userModel.getByname(req.cookies['uname'],function(results){
// 		res.render('home/admin_info', {userlist: results});
// 	});
	
// });
// router.post('/info', (req, res)=>{
	
// 	var user = {
//         fname: 	  req.body.fname,
//         username: req.body.uname,  //fname, uname, pass, pass2, email, phone, address1, member(freelancer/buyer) 
//         password: req.body.pass,
//         email:    req.body.email, 
//         phone:    req.body.phone,
//         address:  req.body.address1
//         //member: req.body.member
//          // need to check for radio button
// 	};
// 	console.log(user);
// 	//console.log(req.body);
// 	//res.render('home/index');// remove it after you have done your work
	
// 	 userModel.update(user,function(status){
// 		if(status){
// 			userModel.getByname(user.username,function(results){
// 			//alert("user info updated");
// 			res.render('home/admin_info', {userlist: results});
// 			});// need to change the path
// 		}else{
// 			//alert("something wrong cannot update");
// 			res.redirect('/home/info');
// 		}
//     });
		
	
// });


// router.get('/userlist', (req, res)=>{

// 	userModel.getAll(function(results){
// 		res.render('home/userlist', {userlist: results});
// 	});

// });
module.exports = router;