const express 	= require('express');
const freelancerModel	= require.main.require('./models/freelancerModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
    
    // res.render('/admin_buyerlist');// remove it after you have done your work
    freelancerModel.getAll(function(results){
        //console.log(results);
		res.render('adFreelancerlist/adminFreelancerlist', {userlist: results});
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
	freelancerModel.getById(req.params.id, function(results){
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
            console.log("user",user);	
        freelancerModel.delete(user, function(status){
		if(status){
            freelancerModel.getAll(function(results){
                res.render('adFreelancerlist/adminFreelancerlist', {userlist: results});
        });
			//res.render('adFreelancerlist/adminFreelancerlist');// need to change the path
		}else{
			res.redirect('/adFreelancerlist/adminFreelancerlist');
		}
	});
			//res.render('/adBuyerlist/delete', {userlist:results});
			 //console.log(userlist);
	});
	
})

// router.post('/delete/:id', (req, res)=>{
// 	var user = {
//         fname: req.body.fname,
//         username: req.body.uname,  //fname, uname, pass, pass2, email, phone, address1, member(freelancer/buyer) 
//         password: req.body.pass,
//         email:    req.body.email, 
//         phone:    req.body.phone,
//         address:  req.body.address1, 
//         member: req.body.member
//          // need to check for radio button
// 	};
// 	freelancerModel.delete(user, function(status){
// 		if(status){
// 			res.redirect('/adBuyerlist/admin_buyerlist');// need to change the path
// 		}else{
// 			res.redirect('/adBuyerlist/delete');
// 		}
// 	});
// 	//delete from DB
// 	// res.redirect('/home/userlist');
// })
module.exports = router;