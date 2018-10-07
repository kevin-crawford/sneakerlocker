'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');

const should = chai.should();

const { Owner } = require('../models');
const { closeServer, runServer, app } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

describe('owners endpoint', function(){
	const username = 'sneakerhead';
	const password = 'testpassword';
	const firstName = 'First';
	const lastName = 'Last';
	const email = 'testemail@gmail.com';

	before(function () {
    return runServer(TEST_DATABASE_URL);
	});
	
	after(function () {
    return closeServer();
  });

  beforeEach(function () { });

  afterEach(function () {
    return Owner.remove({});
  });

	describe('/owners', function() {
		describe('POST', function() {
			it('Should reject sign ups with a missing field', function() {
				return chai
					.request(app)
					.post('/')
					.send({
						firstName,
						lastName,
						password
					})
					.then(function (res){
						res.should.have.status(422);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.reason.should.equal('ValidationError');
						res.body.message.should.equal('Missing Field');
					});
				});
				it('Should reject non-string fields', function () {
					return chai
						.request(app)
						.post('/')
						.send({
							username: 1234,
							firstName,
							lastName,
							password,
							email
						})
						.then(function(res){
							res.should.have.status(422);
							res.should.be.json;
							res.body.should.be.a('object');
							res.body.reason.should.equal('ValidationError');
							res.body.message.should.equal('Incorrect field type: expected string');
							res.body.location.should.equal('username');
						});
				});
				it('Should reject fields with whitespace', function () {
					return chai
						.request(app)
						.post('/')
						.send({
							username: ' 1234 ',
							firstName,
							lastName,
							password,
							email
						})
						.then(function(res){
							expect(res).to.have.status(422);
							res.should.be.json;
							res.body.should.be.a('object');
							res.body.reason.should.equal('ValidationError');
							res.body.message.should.equal('Cannot start or end with whitespace');
							res.body.location.should.equal('username');
						});
				});
				it('Should reject passwords that are not greater than 10 characters', function() {
					return chai
						.request(app)
						.post('/')
						.send({
							username,
							firstName,
							lastName,
							password: '12456789',
							email
						})
						.then(function(res){
							expect(res).to.have.status(422);
							res.should.be.json;
							res.body.should.be.a('object');
							res.body.reason.should.equal('ValidationError');
							res.body.message.should.equal('Must be at least 10 characters long');
							res.body.location.should.equal('password');
					});
				});
				it('Should reject passwords that are greater than 72 characters', function() {
					return chai
						.request(app)
						.post('/')
						.send({
							username,
							firstName,
							lastName,
							password: new Array(73).fill('a').join(''),
							email
						})
						.then(function(res){
							expect(res).to.have.status(422);
							res.should.be.json;
							res.body.should.be.a('object');
							res.body.reason.should.equal('ValidationError');
							res.body.message.should.equal('Must be at most 72 characters long');
							res.body.location.should.equal('password');
					});
				});
				it('Should reject emails already in use', function() {
					chai.request(app).post('/').send({
						username,
						password,
						firstName,
						lastName,
						email
					})
					.then(() => {
						chai.request(app).post('/').send({
							username: 'anotheruser',
							password,
							firstName,
							lastName,
							email
						});
					})
					.then(function(res){
						expect(res).to.have.status(422);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.reason.should.equal('ValidationError');
						res.body.message.should.equal('email already taken');
						res.body.location.should.equal('email');
					});
				});
				it('Should reject usernames already in use', function() {
					chai.request(app).post('/').send({
						username,
						password,
						firstName,
						lastName,
						email
					})
					.then(() => {
						chai.request(app).post('/').send({
							username,
							password,
							firstName,
							lastName,
							email: 'anotheremail@gmail.com'
						});
					})
					.then(function(res){
						expect(res).to.have.status(422);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.reason.should.equal('ValidationError');
						res.body.message.should.equal('Username already taken');
						res.body.location.should.equal('username');
					});
				});
				it('should create new owner', function(){
					return chai
					.request(app)
					.post('/')
					.send({
						username,
						firstName,
						lastName,
						password,
						email
					})
					.then(function(res){
						res.should.have.status(201);
						res.should.be.json;
				});
				});
			});
		});
	});
