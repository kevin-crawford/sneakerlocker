'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const should = chai.should();

const jwtAuth = passport.authenticate('jwt', {session: false});

const { Owner, Inventory } = require('../models');
const { closeServer, runServer, app } = require('../server');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

function generateItem() {
	return {
		shoeBrand: 'Nike',
		shoeModel: 'Presto',
		primaryColor: 'Red',
		shoeSize: '11.5'
	}
}

// function createOwner() {
// 	return {
// 	username = 'sneakerhead';
// 	password = 'testpassword';
// 	firstName = 'First';
// 	lastName = 'Last';
// 	email = 'testemail@gmail.com';
// 	}
// }

function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

describe('/owners inventory endpoint', function(){
	const newItem = generateItem();
	const username = 'sneakerhead';
	const password = 'testpassword';
	const firstName = 'First';
	const lastName = 'Last';
	const email = 'testemail@gmail.com';
	const token = jwt.sign(
		{
			user: {
				username,
				firstName,
				lastName,
			}
		},
		JWT_SECRET,
		{
			algorithm: 'HS256',
			subject: username,
			expiresIn: '7d'
		});

	// console.log(token);
	console.log('Logging User', token);

	before(function () {
    return runServer(TEST_DATABASE_URL);
	});
	
	after(function () {
    return closeServer();
  });

  beforeEach(function () { 
		return Owner.hashPassword(password).then(password => {
			console.log(password);
			Owner.create({
				username,
				password,
				firstName,
				lastName,
				email
			})
		});
	});

  afterEach(function () {
    return Owner.remove({});
	});

describe('Protected Items in Inventory endpoint', function() {
	it('Should create a new item',function(){
		return chai
			.request(app)
			.post('/inventory/addShoe')
			.send(newItem)
			.set('authorization', `Bearer ${token}`)
			.then(function(res){
				console.log('Logging Response',res);
				
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.to.have.keys('_id','shoeBrand','shoeModel','primaryColor','shoeSize');
				res.body.shoeBrand.should.equal(newItem.shoeBrand);
				res.body.shoeModel.should.equal(newItem.shoeModel);
				res.body.primaryColor.should.equal(newItem.primaryColor);
				res.body.shoeSize.should.equal(newItem.shoeSize);
			})
			.then(function(item) {
				item.should.not.be.null;
				item.shoeBrand.should.equal(netItem.shoeBrand);
				item.shoeModel.should.equal(netItem.shoeModel);
				item.primaryColor.should.equal(netItem.primaryColor);
				item.shoeSize.should.equal(netItem.shoeSize);
			});
	});
});

});