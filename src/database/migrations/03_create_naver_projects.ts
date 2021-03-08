import { Knex } from "knex";


export async function up(knex: Knex) {
  return knex.schema.createTable('naver_projects', table => {
    table.uuid('id').primary()
    table.uuid('naver_id').notNullable().references('id').inTable('navers')
    table.uuid('project_id').notNullable().references('id').inTable('projects')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('naver_projects')
}