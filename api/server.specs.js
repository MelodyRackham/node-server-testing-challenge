const request = require('supertest');
const db = require('../data/db-config');
const server = require('./server.js');
const { insert, remove } = require('./carsModel.js');

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
