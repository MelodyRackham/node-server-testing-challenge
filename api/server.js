const express = require('express');

const Cars = require('../cars/carsModel.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({ api: 'Server is up and running...', environment: process.env.DB_ENV });
});

server.get('/cars', (req, res) => {
  Cars.getAll()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      res.status(500).json({ error: 'Cannot get cars.. try again.. ' });
    });
});

server.get('/:id/cars', (req, res) => {
  const { id } = req.params;

  Cars.findById(id)
    .then(cars => {
      if (cars) {
        res.json(cars);
      } else {
        res.status(404).json({ message: 'Could not find car.. try again .. ' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed' });
    });
});

server.post('/cars', (req, res) => {
  const addCar = req.body;
  Cars.insert(addCar)
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: `error` });
    });
});
// 😬
server.delete('/:id/car', (req, res) => {
  const { id } = req.params;

  Cars.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find car with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete car' });
    });
});

module.exports = server;
