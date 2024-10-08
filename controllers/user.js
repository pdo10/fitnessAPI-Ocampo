const User = require("../models/User");
const bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);
const auth = require("../auth");

module.exports.registerUser = (req,res) => {

		let newUser = new User({
			email : req.body.email,
			password : bcrypt.hashSync(req.body.password, 10)
		})

		return newUser.save()
		.then((user) => res.status(201).send({ message: "Registered Successfully" }))
		.catch(err => {
			console.error("Error in saving user:", err)
			res.status(500).send({ error: "Error in saving" })
	})   
};

module.exports.loginUser = (req, res) => {

		return User.findOne({ email : req.body.email })
		.then(result => {

			if(result == null){

				return res.status(404).send({ error: "No Email Found" });

			} else {
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
				if (isPasswordCorrect) {
					return res.status(200).send({ 
						message: 'User logged in successfully.',
						access : auth.createAccessToken(result)})
				} else {

					return res.status(401).send({ error: "Email and password do not match" });
				}
			}
		})
		.catch(err => res.status(500).send({ error: "Error in find" }))
};

module.exports.getProfile = (req, res) => {
	User.findById(req.user.id)
    .then(user => {

    	if(!user) {
            return res.status(404).send({ message: 'User not found' })

    	} 
    	user.password = "";
	    return res.status(200).send({user: user});   		
    })
    .catch(err => errorHandler(err, req, res));
};