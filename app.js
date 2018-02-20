var express =require('express');
var path=require('path');
var bodyParser=require('body-parser');
var nodemailer=require('nodemailer');
var app=express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req,res){
 res.render('index',{ title: 'Welcome'});
});
app.get('/about', function(req,res){
 res.render('about');
});

app.post('/contact/send', function(req,res){
	var transporter=nodemailer.createTransport({
	 service: 'Gmail',
	 auth: {
	 	user: 'rohitsuryan79@gmail.com',
	 	pass: '************'
	 }
	 });
	var mailOption={
		from: 'Brad Traversy<rohitsuryan79@gmail.com>',
		to: 'rohit.cse.msit@gmail.com',
		subject: 'Website Submission',
		text: 'bjviuhiohlhkgxdtxfjchgvb Name:' +req.body.name+ 'email'+req.body.email+'Messase'+req.body.message

	};
	transporter.sendMail(mailOption,function(error,info){
		if(error){
          console.log(error);
          res.redirect('/');
		}else{
			console.log("message sent" +info.response);
           res.redirect('/');
		}
	});

		
 
});
app.get('/contact', function(req,res){
 res.render('contact');
});
app.listen(3000);
console.log('Server is running on port 3000..');