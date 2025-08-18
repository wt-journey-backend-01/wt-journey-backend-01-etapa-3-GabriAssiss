 Guia de Instalação e Uso

Este guia contém as instruções necessárias para configurar e executar a aplicação, incluindo a configuração do banco de dados com Docker, a execução de migrations e a inserção de dados iniciais com seeds.

## 1. Subir o Banco de Dados com Docker

1.  **Crie o arquivo `.env`:**
    O `docker-compose.yml` e o `knexfile.js` dependem de um arquivo de variáveis de ambiente. Crie um arquivo chamado **`.env`** na raiz do projeto com o seguinte conteúdo, substituindo pelos seus dados:
    ```ini
    POSTGRES_USER=seu_usuario
    POSTGRES_PASSWORD=sua_senha
    POSTGRES_DB=seu_banco
    ```

2.  **Inicie o serviço do Docker:**
    Abra o terminal no diretório do projeto e execute o comando abaixo. Ele irá criar e iniciar o contêiner do PostgreSQL.
    ```bash
    docker-compose up -d
    ```

---

## 2. Executar Migrations

As migrations criam e gerenciam a estrutura do seu banco de dados.

1.  **Verifique a conexão:**
    Garanta que o contêiner `postgres-db` está rodando e que as credenciais no seu arquivo `.env` correspondem às do seu `knexfile.js`.

2.  **Execute as migrations:**
    Execute o comando para rodar todas as migrations pendentes e criar as tabelas.
    ```bash
    npx knex migrate:latest
    ```

---

## 3. Rodar Seeds

Seeds são usados para popular o banco de dados com dados de teste ou iniciais.

1.  **Execute os seeds:**
    Após as migrations serem concluídas, execute o comando abaixo para popular as tabelas.
    ```bash
    npx knex seed:run
    ```