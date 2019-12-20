exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cars').insert([
        {
          Year: '2008',
          Make: 'Chevy',
          Model: 'Impala',
        },
        {
          Year: '2012',
          Make: 'Tesla',
          Model: 'Model 3',
        },

        {
          Year: '2019',
          Make: 'Ford',
          Model: 'Escape',
        },
      ]);
    });
};
