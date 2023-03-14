const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modal/login'); // User model with Mongoose schema
module.exports.checkLogin = async (req, res) => {
    const { email, password } = req.body;
    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Validate user's password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    // Generate and sign JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send response with token and user details
    res.json({ token, user: { _id: user._id, email: user.email } });
}

// Middleware for verifying JWT token and authorizing requests
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports.getAuth = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
}

const validateRequestBody = (requiredFields) => (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }
    next();
};


module.exports.valrqst = async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.json({ user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}