const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const buyerModel	= require.main.require('./models/buyerModel');
const freelancerModel	= require.main.require('./models/freelancerModel');
const joblistModel		=require.main.require('./models/joblistModel');
const router 	= express.Router();
var pdf        = require('html-pdf');
var fs         = require('fs');
var options    = {format:'A4'};


router.get('/', (req, res)=>{
	if(req.cookies['uname'] != null){
		joblistModel.getcount(function(results){
			console.log(results);
			buyerModel.getcount(function(count){
					//console.log(count);
					freelancerModel.getcount(function(count2){
						//console.log(count2);
	
						res.render('home/index', {userlist: results, bc: count,fc: count2 });
					});		
			});
			
		});
	}
	else{
		res.redirect('/login');
	}
	

	//res.render('home/index');// remove it after you have done your work

});

router.get('/ajaxsearch/:id',(req,res)=>{

	var txt = req.body.search_input;

	console.log(txt);

	var word = req.params.id;
	console.log('word value '+word);
	if(word!=null || word!=undefined || txt!=null)
	{
		joblistModel.getsearch(word, function(results){

			var str = "";
			for(i=0;i<results.length;i++)
			{
				str+='<a style="position:relative; left:30px; font-size:20px; margin-top:50px;" href="/user/hmedit/'+results[i].id+'">'+results[i].buyer_uname+'</a><br><br>';

			}
			console.log("in ajax "+str);
			//res.render('user/edit', {users: results});
			res.send(str);

		});
	}
	

});
// router.get('/search/:word',(req,res)=>{
   
// 	joblistModel.getsearch(req.params.word, function(results){
// 		if(results){

//                 res.render('home/joblist_search', {userlist: results});
        
// 			//res.render('adFreelancerlist/adminFreelancerlist');// need to change the path
// 		}else{

// 			res.redirect('/home/joblist');
// 		}
// 	});

// });

router.get('/joblist', (req, res)=>{
	
	joblistModel.getAll(function(results){
        //console.log(results);
		res.render('home/joblist', {userlist: results});
	});
	//res.render('home/joblist');// remove it after you have done your work
	// chatModel.getByname(req.cookies['uname'],function(results){
	// 	res.render('home/inbox', {userlist: results});
	// });
	
});

router.get('/joblist/delete/:id', (req, res)=>{
	// a_id = req.params.id;
	// console.log(a_id);
	joblistModel.getById(req.params.id, function(results){
    console.log("obj",results);		
    var user = {
			id : req.params.id,
			buyer_uname: results[0].buyer_uname,
			buyer_email: results[0].buyer_email,  //user.buyer_uname, user.buyer_email, user.job_desc, user.job_date, user.salary, user.freelancer_uname 
			job_desc: 	results[0].job_desc,
			job_date:    results[0].job_date, 
			salary:   	 results[0].salary,
			freelancer_uname:  results[0].freelancer_uname
			//member: result.member
			 // need to check for radio button
            };
            console.log("user",user);	
        joblistModel.delete(user, function(status){
		if(status){
            joblistModel.getAll(function(results){
                res.render('home/joblist', {userlist: results});
        });
			//res.render('adFreelancerlist/adminFreelancerlist');// need to change the path
		}else{

			res.redirect('/home/joblist');
		}
	});
			//res.render('/adBuyerlist/delete', {userlist:results});
			 //console.log(userlist);
	});
	
})

////////////////////////freelancer work//////////////////////////////////////////////////////////
router.get('/free_joblist', (req, res)=>{
	
	joblistModel.getAll(function(results){
        //console.log(results);
		res.render('home/free_joblist', {userlist: results});
	});
	//res.render('home/joblist');// remove it after you have done your work
	// chatModel.getByname(req.cookies['uname'],function(results){
	// 	res.render('home/inbox', {userlist: results});
	// });
	
});

router.get('/joblist/apply/:id', (req, res)=>{
	// a_id = req.params.id;
	// console.log(a_id);
	joblistModel.getById(req.params.id, function(results){
    console.log("obj",results);		
    var user = {
			id : req.params.id,
			buyer_uname: results[0].buyer_uname,
			buyer_email: results[0].buyer_email,  //user.buyer_uname, user.buyer_email, user.job_desc, user.job_date, user.salary, user.freelancer_uname 
			job_desc: 	results[0].job_desc,
			job_date:    results[0].job_date, 
			salary:   	 results[0].salary,
			freelancer_uname:  results[0].freelancer_uname
			//member: result.member
			 // need to check for radio button
            };
            console.log("user",user);	
    //     joblistModel.delete(user, function(status){
	// 	if(status){
    //         joblistModel.getAll(function(results){
    //             res.render('home/joblist', {userlist: results});
    //     });
	// 		//res.render('adFreelancerlist/adminFreelancerlist');// need to change the path
	// 	}else{

	// 		res.redirect('/home/joblist');
	// 	}
	// });
			//res.render('/adBuyerlist/delete', {userlist:results});
			 //console.log(userlist);
	});
	
})

//////////freelancer work ends here/////////////////////////////////////////////////////////////////////////////////

router.get('/admin_info', (req, res)=>{
	
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