var User = require('../models/user');
var jwt  = require('jsonwebtoken');
var secret = 'khuljasimsim';

module.exports = function(router){
	// http://localhost:8080/users
	// USER REGISTRATION ROUTE
	router.post('/users',function(request,response){
		var user = new User();
		user.username = request.body.username;
		user.password = request.body.password;
		user.email = request.body.email;
		if(request.body.username == null || request.body.username == '' || request.body.password == null || request.body.password == '' || request.body.email == null || request.body.email == '') {
			//requestsponse.send('Ensure username, email and password is provided');
			response.json({ success: false, message: 'Ensure username, email and password is provided' });
		} else {
			user.save(function(err){
				if(err){
					response.json({ success: false, message: 'User/Email already exist!' });
					//response.send("User/Email already exist!");
				}
				else
					response.json({ success: true, message: 'User created!' });
					//response.send("User created!");
			}); // save into Mongoose db
		}
		
	});

	// USER LOGIN ROUTE // http://localhost:8080/api/authenticate
	router.post('/authenticate',function(request, response){
		User.findOne({ username: request.body.username}).select('email username password').exec(function(err,user){
			if(err) throw err;

			if(!user) { // if user doesn't exist
				response.json({ success: false, message: 'Could not authenticate user'});
			} else {
				if(request.body.password) {
					var validatePassword = user.comparePassword(request.body.password);
					if(!validatePassword)
						response.json({success: false, message: 'Could not authenticate password'});
					else{
						var token = jwt.sign({ username: user.username, email: user.email},secret, { expiresIn: '1h' });
						response.json({success: true, message: 'User Authenticated!', token: token});
					}
				} else {
					response.json({success: false, message: 'No password provided'});					
				}
				
			}	
		})
		//response.send('testing auth route');
	});

	router.use(function (req,res,next) {
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if(token) {
			//verify token
			jwt.verify(token, secret, function (err,decoded) {
				if(err) {
					res.json({success: false, message: 'Token invalid / expired'});
				} else	{
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.json({success: false, message: 'No token provided'});
		}
	})

	// localhost:8080/api/me
	router.post('/me', function (req,res) {
		res.send(req.decoded);
	})
	
	return router;
}

// jwt.sign({
// 	data: 'foobar'
// }, 'secret', {expiresIn : '1h'});