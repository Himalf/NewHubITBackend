// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../modal/login'); // User model with Mongoose schema
// module.exports.checkLogin = async (req, res) => {
//     const { email, password } = req.body;
//     // Check if user exists in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     // Validate user's password
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//         return res.status(401).json({ message: 'Invalid password' });
//     }
//     // Generate and sign JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     // Send response with token and user details
//     res.json({ token, user: { _id: user._id, email: user.email } });
// }

// // Middleware for verifying JWT token and authorizing requests


// module.exports.getAuth = async (req, res) => {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ user });
// }

// // const validateRequestBody = (requiredFields) => (req, res, next) => {
// //     const missingFields = requiredFields.filter(field => !req.body[field]);
// //     if (missingFields.length > 0) {
// //         return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
// //     }
// //     next();
// // };


// module.exports.valrqst = async (req, res) => {
//     const newUser = new User(req.body);
//     try {
//         await newUser.save();
//         res.json({ user: newUser });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }




// // post into login
// module.exports.postlog = async (req, res) => {
//     try {
//         const Login = new User({
//             username: req.body.username,
//             phone: req.body.password,
//         });
//         await Login.save();
//         res.status(201).json({ data: Login, message: 'login data has been addded' })
//     } catch (err) {
//         res.status(422).json({ message: err.message })
//     }
// }