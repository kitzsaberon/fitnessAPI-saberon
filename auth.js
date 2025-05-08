const jwt = require('jsonwebtoken');
const secret = 'FitnessTracker'

module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		email: user.email,
	};

	return jwt.sign(data, secret, {
        expiresIn: '1h' // Optional: Set token expiration
    });
};

module.exports.verify = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ auth: "Failed", message: "No token provided" });
  	}

		const token = authHeader.split(' ')[1];

		jwt.verify(token, secret, function(err, decodedToken) {
			if(err) {
				return res.status(403).send({
					auth: "Failed",
					message: err.message
				});
			} else {
				req.user = decodedToken;
				next();
			}
		})
};

module.exports.errorHandler = (err, req, res, next) => {
	
	console.log(err);

	const statusCode = err.status || 500;
	const errorMessage = err.message || 'Internal Server Error';

	return res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER_ERROR',
			details: err.details || null
		}
	})
};