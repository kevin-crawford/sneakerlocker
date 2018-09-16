'use strict'

const {router} = require('./router');
const {newLocalStrategy, newJwtStrategy} = require('./strategies');

module.exports = {router, newLocalStrategy, newJwtStrategy};