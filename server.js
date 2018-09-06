'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { Author, Locker } =  require('./models');

const app = express();

app.use(morgan('common'));
app.use(express.json());

//END POINTS & CRUD OPS
// get /authors ? do i need to do CRUD opperations for account creation,

// GET /lockers - retrieve all lockers; BROWSE.html

// GET /lockers/:id - retrieve individual locker; myaccount / publicview.html


// do i need CRUD for this endpoint if lockers/:id includes the inventory?

// GET /lockers/:id/inventory - retrieve shoe inventory; myaccount / publicview
// POST /lockers/:id/inventory - add shoe to inventory; myaccount.html
// PUT /lockers/:id/inventory - edit shoe in inventory; myaccount.html
// DELETE /lockers/:id/inventory - delete shoe in inventory; myaccount.html



// // BROWSE LOCKERS BROWSE.HTML
// app.get('/lockers', (req, res) => {
//   Locker
//     .find()
//     .then(lockers => {
//       res.json(lockers.map(locker => {
//         return {
//           id: locker._id,
//           name: locker.author,
//           shoeSize: locker.shoeSize,
//           shoeCount: locker.shoeCount,
//         };
//       }));
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'could not retrieve lockers' });
//     });
// });

// // PUBLIC LOCKER VIEW
// app.get('/lockers/:id', (req, res) => {
//   Locker
//     .findById(req.params.id)
//     .then(locker => {
//       res.json({
//         id: locker._id,
//         name: locker.author,
//         shoeSize: locker.shoeSize,
//         shoeCount: locker.shoeCount,
//         inventory: locker.inventory,
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'could not get locker'});
//     });
// });



if (require.main === module) {
  app.listen(process.env.PORT || 8080, function() {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;