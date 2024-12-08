/**
 * @description jest server
 * @author STEPHEN
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
