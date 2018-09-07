'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var ownerSchema = mongoose.Schema({
	firstName: 'string',
	lastName: 'string',
	userName: {
		type: 'string',
		unique: true
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
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
	shoeSize: 'string',
	shoeCount: 'string',
	inventory: [inventorySchema]
});

lockerSchema.pre('findOne', function(next) {
	this.populate('author');
	next();
});

lockerSchema.pre('find', function(next){
	this.populate('author');
	next();
})

lockerSchema.virtual('authorName').get(function() {
	return `${this.author.firstName} ${this.author.lastName}`.trim();
});

lockerSchema.methods.serialize = function () {
	return {
		id: this._id,
		author: this.authorName,
		shoeSize: this.shoeSize,
		shoeCount: this.shoeCount,
		inventory: this.inventory,
	};
};

var Author = mongoose.model('Author', authorSchema);
const Locker = mongoose.model('Locker', lockerSchema);

module.exports = {Author, Locker};
