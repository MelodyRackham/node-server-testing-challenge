const request = require('supertest');
const db = require('../data/db-config');
const server = require('./server.js');

describe('server', function() {
  describe('GET', function() {
    it('should return 200 OK status', function() {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('Should return JSON response', function() {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should return an API property with value 'Server is up and running...'", function() {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.body.api).toBe('Server is up and running...');
        });
    });

    describe('POST /', function() {
      it('should return server 200 OK', function() {
        const car = { Year: '2008' };
        return request(server)
          .post('/', car)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });
  });
});
////

const db = require('../data/db-config.js');

const { insert, remove } = require('./carsModel.js');

describe('Cars model', function() {
  describe('insert()', () => {
    beforeEach(async () => {
      await db('cars').truncate();
    });

    it('should insert car', async function() {
      const cars = await db('cars');
      expect(cars).toHaveLength(0);
      console.log(cars);
      await insert({
        Year: '2008',
        Make: 'Chevy',
        Model: 'Impala',
      });
      const inserted = await db('cars');
      expect(inserted).toHaveLength(1);
    });
    it('check the name of inserted car', async function() {
      const cars = await db('cars');
      expect(cars).toHaveLength(0);
      console.log(cars);
      await insert({
        Year: '2008',
        Make: 'Chevy',
        Model: 'Impala',
      });
      const inserted = await db('cars');
      expect(inserted[0].Model).toBe('Impala');
    });
  });
});

describe('remove()', () => {
  it('remove', async () => {
    await remove(1);
    const car = await db('cars');
    expect(car).toHaveLength(0);
  });
  it('remove a car given the ID', async () => {
    insert({
      Year: '2008',
      Make: 'Chevy',
      Model: 'Impala',
    });
    await remove(0);
    const cars = await db('cars');
    expect(cars).toHaveLength(1);
  });
});
