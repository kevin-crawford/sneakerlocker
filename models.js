'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;


var ownerSchema = mongoose.Schema({
	firstName: { type: String, default: '' },
	lastName: { type: String, default: '' },
	shoeSize: String,
	shoeCount: String,
	username: {
		type: String,
		minLength: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'}]
});

ownerSchema.methods.serialize = function () {
	return {
		ownerId: this._id,
		username: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || '',
		shoeCount: this.inventory.length,
		shoeSize: this.shoeSize,
		inventory: this.inventory
	};
};


var inventorySchema = mongoose.Schema({ 
		shoeBrand: { type: 'string', required: true},
		shoeModel: { type: 'string', required: true},
		primaryColor: { type: 'string', required: true},
		shoeSize: { type: 'string', required: true},
	});


inventorySchema.methods.serialize = function () {
	return {
		stockNumber: this._id,
		shoeBrand: this.shoeBrand,
		shoeModel: this.shoeModel,
		primaryColor: this.primaryColor,
		shoeSize: this.shoeSize
	};
};

ownerSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

ownerSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
}

ownerSchema.virtual('ownerName').get(function() {
	return `${this.firstName} ${this.lastName}`.trim();
});

const Owner = mongoose.model('Owner', ownerSchema);
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = { Owner, Inventory };
