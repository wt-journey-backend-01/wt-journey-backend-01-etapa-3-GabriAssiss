import { findById, deleteById, save, findAll, updateById } from '../repositories/agentesRepository.js'
import {isValidDate, isFutureDate} from '../utils/errorHandler.js'

export const criarAgente = async (req, res) => {
    const agente = req.body;
    if(!req.body.nome || !req.body.dataDeIncorporacao || !req.body.cargo) {
        return res.status(400).send('Dados inválidos.');
    }

    if (!isValidDate(agente.dataDeIncorporacao) || isFutureDate(agente.dataDeIncorporacao)) {
        return res.status(400).send("Data de incorporação inválida ou no futuro.");
    }
    
    try {
        const novoAgente = await save(agente);
        res.status(201).json(novoAgente);
    } catch (error) {
        console.error('Erro ao criar agente:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

export const acharAgente = async (req, res) => {
    try {
        const agentes = await findAll();
        res.status(200).send(agentes);
    } catch (error) {
        console.error('Erro ao buscar agentes:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

export const acharAgentePorId = async (req, res) => {
    const { id } = req.params; 
    try {
        const agenteProcurado = await findById(id);
        if(!agenteProcurado) {
            return res.status(404).send(`Agente com id:${id} não encontrado.`);
        }
        res.send(agenteProcurado);
    } catch (error) {
        console.error('Erro ao buscar agente por ID:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

export const deletarAgente = async (req, res) => {
    const { id } = req.params; 
    try {
        const agenteDeletado = await deleteById(id);
        if(!agenteDeletado) {
            return res.status(404).send(`Agente com id:${id} não encontrado.`);
        }
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar agente:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

export const atualizarTodosOsAtributosDoAgente = async (req, res) => {
    const { id } = req.params;
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).send("Todos os campos (nome, data de Incorporação, cargo) são obrigatórios.");
    }

    if (req.body.id) {
        return res.status(400).send("Não é permitido alterar o ID do agente.");
    }

    if (!isValidDate(dataDeIncorporacao) || isFutureDate(dataDeIncorporacao)) {
        return res.status(400).send("Data de incorporação inválida ou no futuro.");
    }

    try {
        const updatedAgente = await updateById(id, {nome, dataDeIncorporacao, cargo});
        if (!updatedAgente) {
            return res.status(404).send(`Agente com id:${id} não encontrado.`);
        }

        res.status(200).json(updatedAgente);
    } catch (error) {
        console.error('Erro ao atualizar agente:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

export const atualizarAtributosDoAgente = async (req, res) => {
    const { id } = req.params;
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (req.body.id) {
        return res.status(400).send("Não é permitido alterar o ID do agente.");
    }

    if (dataDeIncorporacao !== undefined && (!isValidDate(dataDeIncorporacao) || isFutureDate(dataDeIncorporacao))) {
        return res.status(400).send("Data de incorporação inválida ou no futuro.");
    }

    const dadosParaAtualizar = {};
    if (nome !== undefined) dadosParaAtualizar.nome = nome;
    if (dataDeIncorporacao !== undefined) dadosParaAtualizar.dataDeIncorporacao = dataDeIncorporacao;
    if (cargo !== undefined) dadosParaAtualizar.cargo = cargo;

    if (Object.keys(dadosParaAtualizar).length === 0) {
        return res.status(400).send("Nenhum campo válido para atualizar foi enviado.");
    }

    try {
        const updatedAgente = await updateById(id, dadosParaAtualizar);
        if (!updatedAgente) {
            return res.status(404).send(`Agente com id:${id} não encontrado.`);
        }

        res.status(200).json(updatedAgente);
    } catch (error) {
        console.error('Erro ao atualizar atributos do agente:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};