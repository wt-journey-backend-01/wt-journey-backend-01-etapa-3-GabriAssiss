import { findById as findAgenteById} from '../repositories/agentesRepository.js'
import { findById, deleteById, save, findAll, updateById } from '../repositories/casosRepository.js'

export const criarCaso = async (req, res) => {
    const caso = req.body;
    if(!req.body.titulo || !req.body.descricao || !req.body.agente_id) {
        return res.status(400).send('Dados inválidos.');
    }

    try {
        const agenteExiste = await findAgenteById(req.body.agente_id);
        if(!agenteExiste) {
            return res.status(404).send('Id do agente inválido.');
        }

        if(!(req.body.status === 'aberto' || req.body.status === 'solucionado')) {
            return res.status(400).send('Status inválido. Use aberto ou solucionado.');
        }

        const novoCaso = await save(caso);
        res.status(201).json(novoCaso);
    } catch (error) {
        console.error('Erro ao criar caso:', error);
        res.status(500).send('Erro interno do servidor.');
    }
    
};

export const acharCaso = async (req, res) => {
    try {
        const casos = await findAll();
        res.status(200).send(casos);
    } catch (error) {
        console.error('Erro ao buscar casos:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

export const acharCasoPorId = async (req, res) => {
    const { id } = req.params; 
    try {
        const casoProcurado = await findById(id);
        if(!casoProcurado) {
            return res.status(404).send(`Caso com id:${id} não encontrado.`);
        }
        res.send(casoProcurado);
    } catch (error) {
        console.error('Erro ao buscar caso por ID:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

export const deletarCaso = async (req, res) => {
    const { id } = req.params; 
    try {
        const casoDeletado = await deleteById(id);
        if(!casoDeletado) {
            return res.status(404).send(`Caso com id:${id} não encontrado.`);
        }
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar caso:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

export const atualizarTodosOsAtributosDoCaso = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).send("Todos os campos (titulo, descricao, status, agente_id) são obrigatórios.");
    }

    if (status !== 'aberto' && status !== 'solucionado') {
        return res.status(400).send("Status inválido. Use 'aberto' ou 'solucionado'.");
    }

    if (req.body.id) {
        return res.status(400).send("Não é permitido alterar o ID do caso.");
    }
    
    try {
        const agenteExiste = await findAgenteById(agente_id);
        if(!agenteExiste) {
            return res.status(404).send('Id do agente inválido.');
        }

        const casoAtualizado = await updateById(id, { titulo, descricao, status, agente_id });
        
        if (!casoAtualizado) {
            return res.status(404).send(`Caso com id:${id} não encontrado.`);
        }

        res.status(200).json(casoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar caso:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

export const atualizarAtributosDoCaso = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status, agente_id } = req.body;

    if (req.body.id) {
        return res.status(400).send("Não é permitido alterar o ID do caso.");
    }

    if (status !== undefined && !(status === 'aberto' || status === 'solucionado')) {
        return res.status(400).send('Status inválido. Use aberto ou solucionado.');
    }

    try {
        if (agente_id !== undefined) {
            const agenteExiste = await findAgenteById(agente_id);
            if(!agenteExiste) {
                return res.status(404).send('Id do agente inválido.');
            }
        }   
    
        const dadosParaAtualizar = {};
        if (titulo !== undefined) dadosParaAtualizar.titulo = titulo;
        if (descricao !== undefined) dadosParaAtualizar.descricao = descricao;
        if (status !== undefined) dadosParaAtualizar.status = status;
        if (agente_id !== undefined) dadosParaAtualizar.agente_id = agente_id;
    
        if (Object.keys(dadosParaAtualizar).length === 0) {
            return res.status(400).send("Nenhum campo válido para atualizar foi enviado.");
        }
    
        const casoAtualizado = await updateById(id, dadosParaAtualizar);
        
        if (!casoAtualizado) {
            return res.status(404).send(`Caso com id:${id} não encontrado.`);
        }
    
        res.status(200).json(casoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar atributos do caso:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};