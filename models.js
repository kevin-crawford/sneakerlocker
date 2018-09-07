'use strict';
// require('uuid')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var ownerSchema = mongoose.Schema({
	firstName: 'string',
	lastName: 'string',
	ownerId: 'string',
	userName: {
		type: 'string',
		unique: true
	},
	password: {
		type: 'string',
		required: true
	}
});

var inventorySchema = mongoose.Schema({ 
	item: {
		shoeBrand: 'string',
		shoeModel: 'string',
		primaryColor: 'string',
		shoeSize: 'string'
	}
});

var lockerSchema = mongoose.Schema({
	owner_name: 'string',
	lockerId: 'number',
	shoeSize: 'string',
	shoeCount: 'string',
	inventory: [inventorySchema]
});

lockerSchema.pre('findOne', function(next) {
	this.populate('owner');
	next();
});

lockerSchema.pre('find', function(next){
	this.populate('owner');
	next();
})

lockerSchema.virtual('owner_name').get(function() {
	return `${this.owner.firstName} ${this.owner.lastName}`.trim();
});

lockerSchema.methods.serialize = function () {
	return {
		lockerId: this.lockerId,
		owner: this.owner,
		shoeSize: this.shoeSize,
		shoeCount: this.shoeCount,
		inventory: this.inventory,
	};
};

var Author = mongoose.model('Author', authorSchema);
const Locker = mongoose.model('Locker', lockerSchema);

module.exports = {Author, Locker};
