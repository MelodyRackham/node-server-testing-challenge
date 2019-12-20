const db = require('../data/db-config.js');

const crud = require('./carsModel.js');

describe('Cars model', function() {
  describe('insert()', () => {
    beforeEach(async () => {
      await db('cars').truncate();
    });

    it('should insert car', async function() {
      const cars = await db('cars');
      expect(cars).toHaveLength(0);
      console.log(cars);
      await crud.insert({
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
      await crud.insert({
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
    await crud.remove(1);
    const car = await db('cars');
    expect(car).toHaveLength(0);
  });
  it('remove a car given the ID', async () => {
    insert({
      Year: '2008',
      Make: 'Chevy',
      Model: 'Impala',
    });
    await crud.remove(0);
    const cars = await db('cars');
    expect(cars).toHaveLength(1);
  });
});
