![Project banner](https://firebasestorage.googleapis.com/v0/b/myself-dg.appspot.com/o/interview%2Fintelbras%2Fbanner-intelbras.png?alt=media&token=1f25fa91-74b9-4112-8220-87e8b520c57d)

Photovoltaic components are part of the resources present in Intelbras' arsenal, which are used for product development. This project is based on obtaining information from these resources and storing them in a database, where the authenticated user can add, remove, update and delete this information, all this interaction is done via a web browser.

![Project Diagram](https://firebasestorage.googleapis.com/v0/b/myself-dg.appspot.com/o/interview%2Fintelbras%2Fintelbras-project-diagram.png?alt=media&token=8e7c7dcf-66f3-49cd-9c37-f701701b93a1)

# How to install locally

## Requirements for installation:

- `Node.js` (version used: 14.18.1)
- `npm` or `yarn` (version used of yarn: 1.22.10)
- Access to a valid PostgreSQL database (Ex: [docker container](https://hub.docker.com/_/postgres))

## Instructions

1. Download to code repository
    ```bash
    git clone https://github.com/davidgaspardev/intelbras-photovoltaic-components
    ```
    or with ssh address
    ```bash
    git clone git@github.com:davidgaspardev/intelbras-photovoltaic-components
    ```
2. Access the code root directory
    ```bash
    cd intelbras-photovoltaic-components
    ```
3. Install code dependencies
    ```bash
    yarn
    ```
    or with node package manager (npm)
    ```bash
    npm install
    ```
4. Create environment file (`.env`) with PostgreSQL database url.
    ```bash
    echo "DATABASE_URL=\"postgresql://__USER__:__PASSWORD__@__HOST__/__DATABASE__\"" > .env
    ```
    Obs: Change the values (`__USER__`, `__PASSWORD__`, `__HOST__` and `__DATABASE__`) to the corresponding credentials of your PostgreSQL.
5. Run code
    ```bash
    yarn dev
    ```
    or with node package manager (npm)
    ```
    npm run dev
    ```

Obs: Você pode ver os dados no banco de dados com o seguinte comando: `yarn db` or with npm `npm run db`

___

## Objetivo

Implementar uma aplicação com controle de autenticação de usuários no qual permita a listagem, criação, alteração e exclusão de componentes fotovoltaicos (CRUD). A listagem deverá permitir filtros através de nome e grupos de componentes. Criar também uma funcionalidade no qual poderá marcar diversos componentes e calcular a cubagem para transporte.

## Estrutura da Aplicação

- Api (Backend)
- Aplicativo (Frontend)
- Banco de Dados

## Especificações Técnicas

### Estrutura de Componentes Solar

1. Id: Código do componente
2. GTIN (Global Trade Item Number)
3. Nome do componente
4. Tipo de Segmento: Ongrid e Offgrid (Classificação interna de geradores fotovoltaicos)
5. Grupo de Componentes: Perfil, Modulo, Inversor, Cabos, Conectores e Baterias
6. Dimensões Logísticas: Altura, Largura e Profundidade
7. Peso bruto e líquido

### Endpoint para o Cálculo de Cubagem

- Método: Post
- URL: /projetos/cubagem
- Body:
```json
[
    {
        “id”: <id do produto>,
        “quantidade”: 10.0,
    }
]
```
- Response:
```json
{
    “cubagem”: 10.0,
    “pesoBruto”: 1.000,
    “pesoLiquido”: 2.000
}
```

### Premissas

- Todas as tabelas deverão ter o controle de data de criação, alteração e desativação (Este cadastro trabalha
com soft delete);
- A API deverá permitir acesso externo, mediante a autenticação.

### Tecnologias Recomendadas

- Banco de dados: PostgreSql ou Mysql
- Back-end: Nodejs
- Front-end: React ou Vue