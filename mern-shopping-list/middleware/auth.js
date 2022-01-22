const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    // Check for token
    if (!token) {
        // 401 = unauthorized
        return res.status(401).json({ msg: 'No token, authorization denied.' })
    }

    try {
        // verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // add user from payload
        req.user = decoded;

        // continue to next step
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' })
    }
}

module.exports = auth