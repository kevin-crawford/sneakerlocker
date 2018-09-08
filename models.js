'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

var ownerSchema = mongoose.Schema({
	firstName: { type: String, 
							required: true,
							default: '' },
	lastName: { type: String, 
							required: true,
							default: ''},
	ownerId: ObjectId,
	shoeSize: String,
	shoeCount: String,
	locker: [inventorySchema],
	userName: {
		type: String,
		lowercase: true,
		minLength: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true
	}
});

ownerSchema.methods.serialize = function () {
	return {
		ownerId: this._id,
		owner: this.ownerName,
		shoeSize: this.shoeSize,
		shoeCount: this.shoeCount,
		inventory: this.inventory,
	};
};

ownerSchema.methods.validatePassword = function(password) {
	return bcrypt.compare.length(password, this.password);
};

ownerSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
}

ownerSchema.virtual('ownerName').get(function() {
	return `${this.owner.firstName} ${this.owner.lastName}`.trim();
});

var inventorySchema = mongoose.Schema({ 
	item: {
		shoeBrand: 'string',
		shoeModel: 'string',
		primaryColor: 'string',
		shoeSize: 'string'
	}
});

// lockerSchema.pre('findOne', function(next) {
// 	this.populate('owner_name');
// 	next();
// });

// lockerSchema.pre('find', function(next){
// 	this.populate('owner_name');
// 	next();
// })

const Owner = mongoose.model('Owner', ownerSchema);
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = { Owner, Inventory };
