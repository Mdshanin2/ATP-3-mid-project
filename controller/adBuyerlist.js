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
	//sconsole.log("obj",results);		
			res.render('adBuyerlist/delete', {userlist:results});
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
	buyerModel.delete(user, function(status){
		if(status){
			res.render('adBuyerlist/adminBuyerlist');// need to change the path
		}else{
			res.redirect('/adBuyerlist/delete');
		}
	});
	//delete from DB
	// res.redirect('/home/userlist');
})
module.exports = router;