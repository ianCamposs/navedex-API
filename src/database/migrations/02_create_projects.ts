import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable('projects', table => {
    table.string('id').primary()
    table.string('user_id').references('id').inTable('users')
    table.string('name').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('projects')
}