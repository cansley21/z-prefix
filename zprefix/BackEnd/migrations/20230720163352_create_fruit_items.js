
exports.up = function(knex) {
  return knex.schema
  .createTable('user', table => {
    table.increments('id').primary();
    table.string('firstname');
    table.string('lastname');
    table.string('username');
    table.string('password');
  })

  .createTable('items', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references(user.id);
    table.string('itemname');
    table.string('description');
    table.integer('quantity');
  })


};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('items')
    .dropTableIfExists('user')
};
