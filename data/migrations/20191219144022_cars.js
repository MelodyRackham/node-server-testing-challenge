exports.up = function(knex, Promise) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.integer('Year', 255).notNullable();
    tbl.string('Make', 255).notNullable();
    tbl.string('Model', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cars');
};
