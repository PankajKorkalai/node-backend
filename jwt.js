// const jwt = require('jsonwebtoken');

// const jwtAuthMiddleware = (req, res, next) => {

//     // first check request headers has authorization or not
//     const authorization= req.headers.authorization  
//     if(!authorization) return res.status(401).json({error: 'Token not found'});


//     // Extract the jwt token from the request headers
//     const token = req.headers.authorization.split('')[1];
//     if(!token) return res.status(401).json({error: 'Unauthorized'});

//     try {
//         // verify the JWT token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         //Attach user information to the request object
//         req.user = decoded
//         next();
//     } catch (error) {
//         console.error(err);
//         res.status(401).json({error: 'Invalid token'});
//     }
// }


// // Function to generate JWT token
// const generateToken  = (userData) => {
//     // Generate a new JWT token using user data
//     return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 100000});
// }

// module.exports = { jwtAuthMiddleware, generateToken};


const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: 'Token not found' });

  // Correct token extraction
  const token = authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err); // Log the actual error
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Function to generate JWT token
const generateToken = (userData) => {
  // Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // expiresIn set to 1 hour for better security
}

module.exports = { jwtAuthMiddleware, generateToken };

