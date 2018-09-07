'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { Owner, Locker } =  require('./models');

const app = express();

app.use(morgan('common'));
app.use(express.json());

// //END POINTS & CRUD OPS
// get /owners/:id ? do i need to do CRUD opperations for account creation,

// GET /lockers - retrieve all lockers; BROWSE.html

// GET /lockers/:id - retrieve individual locker; myaccount / publicview.html
// POST
// DELETE
// PUT




// BROWSE LOCKERS BROWSE.HTML
app.get('/lockers', (req, res) => {
  Locker
    .find()
    .then(lockers => {
      res.json(lockers.map(locker => {
        return {
          lockerId: locker.lockerId,
          name: locker.author,
          shoeSize: locker.shoeSize,
          shoeCount: locker.shoeCount,
        };
      }));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'could not retrieve lockers' });
    });
});

// PUBLIC LOCKER VIEW
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

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
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