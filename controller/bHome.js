const express 	= require('express');
const joblistModel	= require.main.require('./models/joblistModel');
const reviewModel	= require.main.require('./models/reviewModel');
const paymentModel	= require.main.require('./models/paymentModel');
const billingModel	= require.main.require('./models/billingModel');
const financeModel	= require.main.require('./models/financeModel');
const companyPlanModel	= require.main.require('./models/companyPlanModel');
const freelancerModel	= require.main.require('./models/freelancerModel');

const bodyParser    = require('body-parser');
const{check,validationResult } = require('express-validator');

const router 	= express.Router();
const PDFDocument	= require('pdfkit');
const fs 			= require('fs');

router.get('/', (req, res)=>{
	
    if(req.cookies['uname'] != null)
    {
        //res.render('bHome/index')
        joblistModel.getAll(function(results){
        var joblist=results;

            reviewModel.getAll(function(results){
            var reviewlist =results;
                paymentModel.getAll(function(results){
                    var paymentlist=results;
                    billingModel.getAll(function(results){
                        var billinglist=results;
                        financeModel.getAll(function(results){
                            var financelist=results;
                            companyPlanModel.getAll(function(results){
                                var companyPlan=results;
                                freelancerModel.getAll(function(results){
                                    var freelancerlist=results;
                                    console.log(reviewlist);
                                    res.render("bHome/index",{joblist : joblist, reviewlist: reviewlist, paymentlist: paymentlist, billinglist: billinglist, financelist: financelist, companyPlan: companyPlan, freelancerlist: freelancerlist});
                                });
                            });
                        });
                    });
                });
            });
            
        
    });

    router.get('/job/edit/:id', (req, res)=>{

       var data=req.params.id;
        joblistModel.getAll(data, function(results){
            console.log(results);
            res.render('job/edit', {value: results});
        });
    })
    router.post('/job/edit/:id', (req, res)=>{
      data ={
              id : req.params.id,
        job_desc : req.body.job_desc,
        job_date : req.body.job_date,
        salary   : req.body.salary

      }
        
         joblistModel.update(data, function(results){
             console.log(results);
             res.redirect('/buyer');
         });
     })

    router.get('/review/edit/:id', (req, res)=>{

        var data=req.params.id;
         reviewModel.getById(data, function(results){
             console.log(results);
             res.render('review/edit', {value: results});
         });
    })
    router.post('/review/edit/:id', (req, res)=>{
        data ={
                id : req.params.id,
          review : req.body.review,
          date   : req.body.date
        }
         
           reviewModel.update(data, function(results){
               console.log(results);
               res.redirect('/buyer');
           });
    })


    router.get('/payment/edit/:id', (req, res)=>{

        var data=req.params.id;
         paymentModel.getById(data, function(results){
             console.log(results);
             res.render('payment/edit', {value: results});
         });
    })
    router.post('/payment/edit/:id', (req, res)=>{
         data ={
               id : req.params.id,
           fname  : req.body.fname,
           amount : req.body.amount,
           date   : req.body.date
         }
         
         paymentModel.update(data, function(results){
                console.log(results);
                res.redirect('/buyer');
         });
    })


    router.get('/finance/edit/:id', (req, res)=>{

        var data=req.params.id;
         financeModel.getById(data, function(results){
             console.log(results);
             res.render('finance/edit', {value: results});
         });
    })
    router.post('/finance/edit/:id', (req, res)=>{
         data ={
               id : req.params.id,
           month  : req.body.month,
           amount : req.body.amount
         }
         
         financeModel.update(data, function(results){
                console.log(results);
                res.redirect('/buyer');
         });
    })

    router.get('/companyPlan/edit/:id', (req, res)=>{

        var data=req.params.id;
         companyPlanModel.getById(data, function(results){
             console.log(results);
             res.render('companyPlan/edit', {value: results});
         });
    })
    router.post('/companyPlan/edit/:id', (req, res)=>{
         data ={
                     id : req.params.id,
           description  : req.body.description
         }
         
         companyPlanModel.update(data, function(results){
                console.log(results);
                res.redirect('/buyer');
         });
    })

    router.get('/job/delete/:id', (req, res)=>{
        var data=req.params.id;
        joblistModel.getById(data, function(results){
            console.log(results);
            res.render('job/delete', {value: results});
        });
    })
    
    router.post('/job/delete/:id', (req, res)=>{
        var data=req.params.id;
        joblistModel.delete(data, function(status){
            if(status)
            {
                res.redirect('/buyer');	
            }
            else
            {
                res.redirect('/job/delete/:id');
            }   
        });
    })


    router.get('/review/delete/:id', (req, res)=>{
        var data=req.params.id;
        reviewModel.getById(data, function(results){
            console.log(results);
            res.render('review/delete', {value: results});
        });
    })
    
    router.post('/review/delete/:id', (req, res)=>{
        var data=req.params.id;
        reviewModel.delete(data, function(status){
            if(status)
            {
                res.redirect('/buyer');	
            }
            else
            {
                res.redirect('/review/delete/:id');
            }   
        });
    })
    
    router.get('/review/create', (req, res)=>{
        res.render('review/create'); 
    })
    
    router.post('/review/create', [
        check('fname')
            .notEmpty().withMessage('Can not be empty')
            .isLength({ min: 3 }).withMessage('Minimumm length must need to be 3')
        ,
        check('review')
            .notEmpty().withMessage('Can not be empty')
        ,
        check('date')
            .notEmpty().withMessage('Date can not be empty')
        ] ,(req, res)=>{
        
        const errors = validationResult(req);
        if(errors.isEmpty())
        {
            var user = {
                fname  : req.body.fname,
                review : req.body.review,
                date   : req.body.date
            };
        
            reviewModel.insert(user, function(status){
                if(status){
                    res.redirect('/buyer');
                 }else{
                     res.redirect('/review/create');
                 }
            });
        }
        else
        {
            console.log(errors.array());
            var error = errors.array();
            var errormessage = ``;

            for(i=0 ; i<error.length ; i++)
            {
                errormessage=errormessage+ error[i].param + " : " + error[i].msg;
            }

            res.status(200).send({ status : errormessage });
        }
    })

    router.get('/job/create', (req, res)=>{
        res.render('job/create'); 
    })
    
    router.post('/job/create', [
        check('buyer_uname')
            .notEmpty().withMessage('Can not be empty')
            .isLength({ min: 3 }).withMessage('Minimumm length must need to be 3')
        ,
        check('buyer_email')
            .notEmpty().withMessage('Can not be empty')
            .isLength({ min: 3 }).withMessage('Minimumm length must need to be 3')
        ,
        check('job_desc')
            .notEmpty().withMessage('Can not be empty')
            .isLength({ min: 10 }).withMessage('Minimumm length must need to be 10')
        ,
        check('job_date')
            .notEmpty().withMessage('Date can not be empty')
        ,
        check('salary')
            .notEmpty().withMessage('salary can not be empty')
        ] ,(req, res)=>{
        
        const errors = validationResult(req);
        if(errors.isEmpty())
        {
            var user = {
                buyer_uname  : req.body.buyer_uname,
                buyer_email  : req.body.buyer_email,
                job_desc     : req.body.job_desc,
                job_date     : req.body.job_date,
                salary       : req.body.salary
            };
        
            joblistModel.insert(user, function(status){
                if(status){
                    res.redirect('/buyer');
                 }else{
                     res.redirect('/buyer/job/create');
                 }
            });
        }
        else
        {
            console.log(errors.array());
            var error = errors.array();
            var errormessage = ``;

            for(i=0 ; i<error.length ; i++)
            {
                errormessage=errormessage+ error[i].param + " : " + error[i].msg;
            }

            res.status(200).send({ status : errormessage });
        }
    })

    router.get('/report', (req, res)=>{
        res.render('report'); 
    })

    router.get('/generateBillingReport', (req, res)=>{
	
        // Create a document
        const doc = new PDFDocument();
            
        var date = new Date();
        doc.pipe(fs.createWriteStream("assets/buyer/report/billingreport/"+date.getTime()+"[billingInfo].pdf"));	// Pipe its output somewhere, like to a file or HTTP response
        doc.fontSize(40);
        doc.text("Billing Reports-", 50, 50);
        billingModel.getAll(function(results){
            if(results.length > -1)
            {
                totalbilling = results.length;
                totalamount=0;
                totaltax=0;

                for(i=0 ; i<results.length ; i++)
                {
                    var amount=results[i].amount;
                    totalamount=totalamount+amount;
                }	
                for(i=0 ; i<results.length ; i++)
                {
                    var tax=results[i].tax;
                    totaltax=totaltax+tax;
                }		
                doc.fontSize(20);
                doc.text("Total number of billing = "+totalbilling , 50, 100);
                doc.text("Total billing amount = "+totalamount , 50 , 130);
                doc.text("Total tax = "+totaltax , 50 , 160);
                i=totalamount+totaltax;
                doc.fontSize(30);
                doc.text("In Total cash paid = " + i , 50, 190);
                doc.end();
                res.redirect('/buyer/report');
            }
            else
            {
                res.redirect('/buyer/report');
            }
        });
    })

    router.get('/searchFreelancer', (req, res)=>{
        res.render('searchFreelancer'); 
    })

    router.post('/searchFreelancer', (req, res)=>{
        var data = {
			username : req.body.username
		};
		console.log(data.username);
		freelancerModel.searchByUsername(data, function(results){
			var freelancer=`<table id="view">
						<tr>
							<td>Freelancer Name</td>
							<td>Username</td>
							<td>Email</td> 
							<td>Phone</td>
							<td>Address</td>
						</tr>`;
			for(i=0; i<results.length ; i++)
			{
				freelancer=freelancer+"<tr>";
				freelancer=freelancer+"<td>"+results[i].fname+"</td>";
				freelancer=freelancer+"<td>"+results[i].username+"</td>";
				freelancer=freelancer+"<td>"+results[i].email+"</td>";
				freelancer=freelancer+"<td>"+results[i].phone+"</td>";
				freelancer=freelancer+"<td>"+results[i].address+"</td>";
				freelancer=freelancer+"</tr>";
			}
			freelancer=freelancer+`</table>`;
			console.log(freelancer);
			res.status(200).send({ status : freelancer });
		}); 
    })
    }else{
        res.redirect('/login');
    }
})

module.exports = router;