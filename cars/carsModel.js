const db = require('../data/db-config');

module.exports = {
  insert,
  remove,
  getAll,
  findById,
};

function getAll() {
  return db('cars');
}

async function insert(cars) {
  const [id] = await db('cars').insert(cars, 'id');
  return db('cars')
    .where({ id })
    .first();
}

function remove(id) {
  return db('cars')
    .where({ id })
    .del();
}

function findById(id) {
  return db('cars')
    .where({ id })
    .first();
}
