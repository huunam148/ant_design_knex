/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {id: 1, colName: 'Romance'},
    {id: 2, colName: 'Mystery'},
    {id: 3, colName: 'Science Fiction'}
  ]);
};
