const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });
        User.create(username, hash, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'User created!' });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, users) => {
        if (err) return res.status(500).json({ error: err });
        if (!users.length) return res.status(401).json({ message: 'Authentication failed' });

        const user = users[0];
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) return res.status(500).json({ error: err });
            if (match) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Authentication failed' });
            }
        });
    });
};
