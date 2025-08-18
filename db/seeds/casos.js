/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('casos').del()
  await knex('casos').insert([
  { 
    titulo: 'Solicitação de nova funcionalidade', 
    descricao: 'Adicionar opção de exportar dados para PDF.', 
    status: 'solucionado', 
    agente_id: 2
  },
  { 
    titulo: 'Lentidão na aplicação', 
    descricao: 'Sistema está lento ao carregar a página inicial.', 
    status: 'aberto', 
    agente_id: 1
  }
]);
};
