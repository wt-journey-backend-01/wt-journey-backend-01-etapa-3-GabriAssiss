import knexConfig from '../knexfile.js';
import knex from 'knex';

const nodeEnv = process.env.NODE_ENV || 'development';

if (!knexConfig[nodeEnv]) {
  throw new Error(`Configuração do Knex para NODE_ENV="${nodeEnv}" não encontrada`);
}

const db = knex(knexConfig[nodeEnv]);

export default db;
