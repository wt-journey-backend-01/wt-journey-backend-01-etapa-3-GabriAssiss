import db from '../db/db.js';

export const save = async (caso) => {
    try {
        const insertedId = await db('casos').insert(caso).returning('id');
        const id = insertedId[0];
        const novoCaso = await db('casos').where({ id }).first();
        return { id, ...caso };

    } catch (error) {
        console.error('Erro ao salvar caso:', error);
        throw error;
    }
};

export const findById = async (id) => {
    try {
        const caso = await db('casos').where({ id: Number(id) }).first(); 
        return caso;
    } catch (error) {
        console.error('Erro ao buscar caso por ID:', error);
        throw error;
    }
};

export const deleteById = async (id) => {
    try {
        const deletedCount = await db('casos').where({ id: Number(id) }).del();
        return deletedCount > 0;
    } catch (error) {
        console.error('Erro ao deletar caso por ID:', error);
        throw error;
    }
};

export const findAll = async () => {
    try {
        const casos = await db('casos').select('*');
        return casos;
    } catch (error) {
        console.error('Erro ao buscar todos os casos:', error);
        throw error;
    }
};

export const updateById = async (id, newData) => {
    try {
        const updatedCount = await db('casos').where({ id: Number(id) }).update(newData);
        if (updatedCount > 0) {
            const casoAtualizado = await findById(id);
            return casoAtualizado;
        }
        return null;
    } catch (error) {
        console.error('Erro ao atualizar caso por ID:', error);
        throw error;
    }
};