// const jwt = require('jsonwebtoken');
// const User = require('./models/User'); // Adjust the path if necessary

// const authenticate = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }
//       req.user = decoded;
//       next();
//     });
//   } else {
//     next();
//   }
// };

// const generateToken = (user) => {
//   return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// module.exports = { authenticate, generateToken };


const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
