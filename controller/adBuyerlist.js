const express 	= require('express');
const buyerModel	= require.main.require('./models/buyerModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
    
    // res.render('/admin_buyerlist');// remove it after you have done your work
    buyerModel.getAll(function(results){
		res.render('adBuyerlist/adminBuyerlist', {userlist: results});
	});

	// if(req.cookies['uname'] != null){
	// 	res.render('home/index');
	// }else{
	// 	res.redirect('/login');
	// }
})

router.get('/delete/:id', (req, res)=>{
	// a_id = req.params.id;
	// console.log(a_id);
	buyerModel.getById(req.params.id, function(results){
		console.log("obj",results);		
		var user = {
				id : req.params.id,
				fname: results[0].fname,
				username: results[0].username,  //fname, uname, pass, pass2, email, phone, address1, member(freelancer/buyer) 
				password: results[0].password,
				email:    results[0].email, 
				phone:    results[0].phone,
				address:  results[0].address
				//member: result.member
				 // need to check for radio button
				};
				console.log("delete user",user);	
			buyerModel.delete(user, function(status){
			if(status){
				console.log("delete done");
				buyerModel.getAll(function(result){
					res.render('adBuyerlist/adminBuyerlist', {userlist: result});
			});
				//res.render('adFreelancerlist/adminFreelancerlist');// need to change the path
			}else{
				res.redirect('/adBuyerlist/adminBuyerlist');
			}
		});
				//res.render('/adBuyerlist/delete', {userlist:results});
				 //console.log(userlist);
		});


		
	
})

router.post('/delete/:id', (req, res)=>{
// 	var user = {
//         fname: req.body.fname,
//         username: req.body.uname,  //fname, uname, pass, pass2, email, phone, address1, member(freelancer/buyer) 
//         password: req.body.pass,
//         email:    req.body.email, 
//         phone:    req.body.phone,
//         address:  req.body.address1, 
//         //member: req.body.member
//          // need to check for radio button
// 	};
// console.log("delete this",user);
// 	buyerModel.delete(user, function(status){
// 		console.log("deletion done");
// 		if(status){
// 			console.log("deletion done status");
// 			buyerModel.getAll(function(results){
// 				res.render('adBuyerlist/adminBuyerlist', {userlist: results});
// 			});
		
// 		}else{
// 			res.redirect('/adBuyerlist');
// 		}
// 	});
	//delete from DB
	// res.redirect('/home/userlist');
 });
module.exports = router;