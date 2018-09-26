'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const { Owner, Inventory } =  require('./models');
const {PORT, DATABASE_URL} = require('./config');
const { router: authRouter, newLocalStrategy, newJwtStrategy } = require('./auth/')
const app = express();
const jsonParser = bodyParser.json();


passport.use(newLocalStrategy);
passport.use(newJwtStrategy);
//logging
app.use(morgan('common'));
app.use(express.json());
app.use(express.static('public'));
app.use('/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.get('/', (req, res) => {
  res.sendFile('/public/index.html');
})

// BROWSE OWNERS *BROWSE.HTML* -- WORKING 9-15-18
app.get('/browse', (req, res) => {
  Owner
    .find()
    .then(owners => {
      res.json(owners.map(owner => {
        return owner.serialize();
      }));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'could not retrieve owners' });
    });
});

// ADD NEW OWNER -- CREATE USER ACCOUNT -- HASH PW -- WORKING 9-15-18
app.post('/', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password', 'email'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if(missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing Field',
      location: missingField
    });
  }
  
  const stringFields = ['username', 'password', 'firstName', 'lastName', 'email'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );
  
  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  const explicityTrimmedFields = ['username', 'password','email'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if(nonTrimmedField){
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 10,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if( tooSmallField || tooLargeField ) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {username, password, firstName = '', lastName = '', email} = req.body;

  firstName = firstName.trim();
  lastName = lastName.trim();

  return Owner.find({email})
    .count()
    .then(count => {
      if(count > 0 ) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'email already taken',
          location: 'email'
        })
      }
    })
    .then(() => { 
      return Owner.find({username})
    .count()
    .then(count => {
      if(count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      return Owner.hashPassword(password);
    })
    .then(hash => {
      return Owner.create({
        username,
        password: hash,
        firstName,
        lastName,
        email
      });
    })
    .then(owner => {
      return res.status(201).json('new owner created');
    })
  })
    .catch(err => {
      if(err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

// --- EDIT OWNER --- ** 
// NEED TO ENCRYPT PW WHEN EDITED

app.put('/owner', jwtAuth, (req, res) => {

  const updated = {};
  const updatableFields = ['firstName', 'lastName', 'username', 'password', 'email', 'shoeSize'];

  // add fields to update object from request body
  updatableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    } 
  });

  Owner
    .findOne({ username: updated.userName || '', _id: { $ne: req.user.ownerId }})
    .then(username => {
      if(username) {
        const message = 'Username already taken';
        console.error(message);
        return res.status(400).send(message);
      }
      else {
        Owner
          .findOne({ email: updated.email , _id: { $ne: req.user.ownerId}})
          .then( email => {
            if(email) {
              const message = 'Email already taken';
              console.error(message);
              return res.status(400).send(message);
            }
          })
        Owner
        .findByIdAndUpdate(req.user.ownerId, { $set: updated }, { new: true   })
        .then( updatedOwner => {
          res.status(200).json({
            ownerId: updatedOwner.id,
            firstName: `${updatedOwner.firstName}`,
            lastName: `${updatedOwner.lastName}`,
            username: updatedOwner.username,
            email: updatedOwner.email
          });
        })
        .catch(err => res.status(500).json({ message: err }));
      }
    });
});


//PUBLIC LOCKER VIEW -- WORKING 9-15-18
app.get('/:username/inventory/', (req, res) => {
  Owner
    .findOne({ username: `${req.params.username}`}).populate('inventory').exec()
    .then(owner => {
      res.json(owner.inventory.map( item => item.serialize()))
    })
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    })
});


//--- ADD SHOE TO OWNER LOCKER --- WORKING 9-15-18
app.post('/inventory/addShoe', jwtAuth, (req,res) => {

  Inventory
  .create({
    shoeBrand: req.body.shoeBrand,
    shoeModel: req.body.shoeModel,
    primaryColor: req.body.primaryColor,
    shoeSize: req.body.shoeSize
  })
  .then( (item) => {
    Owner
    .findById(req.user.ownerId)
    .then( (owner) => {
      owner.inventory.push(item);
      owner.save()
      .then(() => res.status(201).json(item._id))
      console.log(item._id)
      })
    })
  .catch(err => {
    console.log(err);
  res.status(500).json({ error: 'Could not add shoe to inventory'});
  })
});

// -- EDIT SHOE IN OWNERS LOCKER WORKING 
app.put('/inventory/:itemId/editShoe', jwtAuth, (req, res) => {
const updated = {};
const updatableFields = ['shoeBrand', 'shoeModel', 'primaryColor', 'shoe', 'email']; updatableFields.forEach(field => {
  if (field in req.body) {
    updated[field] = req.body[field];
  }
});
Inventory
  .findByIdAndUpdate(req.params.itemId, {$set: updated}, { new: true })
  .then( updatedItem => {
    res.status(201).json({
      shoeBrand: updatedItem.shoeBrand,
      shoeModel: updatedItem.shoeModel,
      primaryColor: updatedItem.primaryColor,
      shoeSize: updatedItem.shoeSize
    })
  })
  .catch(err => res.status(500).json({ message: err }));
})


// DELETE SHOE FROM OWNER INVENTORY WORKING
app.delete('/inventory/:itemId/deleteShoe', jwtAuth, (req, res) => {
  Inventory
    .findByIdAndRemove(req.params.itemId)
    .then(() =>
  Owner 
    .findById(req.user.ownerId)
    .then(function(owner){ 
      let itemIndex = -1;
      for(let i = 0; i < owner.inventory.length; i++){
        if( owner.inventory[i] == req.params.itemId){
          itemIndex = i;
        }
      }
      if( itemIndex !== -1){
      owner.inventory.splice(itemIndex, 1)
      }
      return owner.save()
    })
    .then(() => {
      res.status(200).json({ message: 'Deleted item'})
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: 'Could not remove from owners array'})
    }))
  .catch(err => {
  console.log(err);
    res.status(500).json({ error: 'Could not delete item from Inventory'});
  });
});

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

// this function connects to our database, then starts the server
function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };