import { Knex } from 'knex'


export async function up(knex: Knex) {
  return knex.schema.createTable('navers', table => {
    table.string('id').primary()
    table.string('user_id').references('id').inTable('users')
    table.string('name').notNullable()
    table.date('birthdate').notNullable()
    table.date('admission_date').notNullable()
    table.string('job_role').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('navers')
}