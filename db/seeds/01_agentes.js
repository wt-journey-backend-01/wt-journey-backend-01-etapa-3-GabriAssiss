/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('agentes').del()
  await knex('agentes').insert([
  { nome: 'Pedro Henrique', dataDeIncorporacao: '2025-08-10', cargo: 'Estagiário' },
  { nome: 'Ana Paula', dataDeIncorporacao: '2025-08-09', cargo: 'Supervisor' }
]);
};
