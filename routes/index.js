var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var config=require('../config');
var transporter=nodemailer.createTransport(config.mailer);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/about',function(req,res){

	res.render('about',{title:'LetUsCode-Platform to share code'});
});

router.route('/contact')
.get(function(req,res,next){
	res.render("contact",{title:'LetUsCode-Platform to share code'});
})
.post(function(req,res,next){
	req.checkBody('name','Empty Name').notEmpty();
	req.checkBody('email','Invalid Email').isEmail();
	req.checkBody('message','Empty Message').notEmpty();
	var errors=req.validationErrors();
	if(errors)
	{
		res.render('contact',{
			title:'LetUsCode-Platform to share code',
			name:req.body.name,
			email:req.body.email,
			message:req.body.message,
			errorMessages:errors
	});
	}
	else
	{

		var mailOptions={
			from:'LetUsCode<no-reply@LetUsCode.com',
			to:'chinkykumar123@gmail.com',
			subject:'you got a new message fromn visitor',
			text:req.body.message
		}
		transporter.sendMail(mailOptions,function(err,info){
			if(err)
			{
				return console.log(err);
			}else
			{
				res.render('thank',{title:'LetUsCode-Platform to share code'});
			}

		});
		
	}
});





module.exports = router;
