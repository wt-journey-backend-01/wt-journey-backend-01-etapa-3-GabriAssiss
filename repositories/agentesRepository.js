import db from '../db/db.js';

export const save = async (agente) => {
    try {
        const [id] = await db('agentes').insert(agente).returning('id');
        return { id, ...agente };
    } catch (error) {
        console.error('Erro ao salvar agente:', error);
        throw error;
    }
};

export const findById = async (id) => {
    try {
        const agente = await db('agentes')
            .where({ id })
            .select('id', 'nome', 'dataDeIncorporacao', 'cargo')
            .first();
        return agente;
    } catch (error) {
        console.error('Erro ao buscar agente por ID:', error);
        throw error;
    }
};

export const deleteById = async (id) => {
    try {
        const deletedCount = await db('agentes').where({ id }).del();
        return deletedCount > 0;
    } catch (error) {
        console.error('Erro ao deletar agente por ID:', error);
        throw error;
    }
};

export const findAll = async () => {
    try {
        const agentes = await db('agentes')
            .select('id', 'nome', 'dataDeIncorporacao', 'cargo');
        return agentes;
    } catch (error) {
        console.error('Erro ao buscar todos os agentes:', error);
        throw error;
    }
};

export const updateById = async (id, newData) => {
    try {
        const updatedCount = await db('agentes').where({ id }).update(newData);
        if (updatedCount > 0) {
            const updatedAgente = await findById(id);
            return updatedAgente;
        }
        return null;
    } catch (error) {
        console.error('Erro ao atualizar agente por ID:', error);
        throw error;
    }
};