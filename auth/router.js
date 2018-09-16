'use strict';

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

const createAuthToken = function(owner) {
	return jwt.sign({owner}, config.JWT_SECRET, {
		subject: owner.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	});
};

const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());

router.post('/login', localAuth, (req, res) => {
	const authToken = createAuthToken(req.user.serialize());
	res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/refresh', jwtAuth, (req, res) => {
	const authToken = createAuthToken(req.owner);
	res.json({authToken});
});

module.exports = {router};