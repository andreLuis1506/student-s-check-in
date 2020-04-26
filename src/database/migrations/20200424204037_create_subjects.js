exports.up = function(knex) {
  return knex.schema.createTable("subjects", function(table) {
    table.increments();
    table.string("name").notNullable();
    table.integer("requirement");
    table.integer("semester").notNullable();
    table.string("status").notNullable();

    table.foreign("requirement").references("users.id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("subjects");
};
