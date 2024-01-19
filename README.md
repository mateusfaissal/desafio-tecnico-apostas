# Quer apostar quanto? 
<hr>
    Essa API simula o back-end de uma casa de apostas, nela você pode cadastrar participantes, jogos, e apostas. Após isso, você poderá obter os resultados das apostas, e checar seus lucros!


# Link do Deploy da API
<hr>
https://desafio-tecnico-apostas-5ubn.onrender.com

# Stack principal
<hr>

- Node.js v20.9.0
- Express.js
- TypeScript
- PostgreSQL
- PrismaORM
- Jest
- Supertest

## Passos para Inicialização

Comece instalando todas as dependências necessárias:

```bash
npm install
```


Prepare o arquivo de configuração de ambiente (.env):

Duplique o arquivo ".env.example" criando duas cópias.
Renomeie essas cópias para ".env" e ".env.test".
Modifique os arquivos para incluir suas próprias configurações, baseando-se na estrutura do exemplo.
Verifique se a string DATABASE_URL em cada arquivo aponta para bancos de dados distintos.
Para configurar o banco de dados e executar as migrações, utilize:

```bash
npm run migrate:dev
```


Para iniciar o projeto em modo de desenvolvimento, execute: 

```bash
npm run dev
```


Caso queira rodar o projeto em modo de produção, siga estes passos:

Primeiro, compile o projeto:

```bash
npm run build
```


Depois, inicie o servidor com o comando:

```bash
node ./dist/src/server.js
```


# Funcionalidades do Projeto

Este projeto é uma API REST voltada para a realização de apostas em eventos esportivos. Ela é composta por três entidades principais: Jogo, Aposta e Participante.

Todas as rotas podem ser verificadas utilizando um cliente de API de sua preferência, através do link de deploy: https://desafio-tecnico-apostas-5ubn.onrender.com


### **POST** `/participants`

-   Permite a criação de um novo participante com um saldo inicial definido.
-   **Dados Necessários**: nome e o saldo inicial do participante.
    ```tsx
    {
        name: string;
        balance: number; // em centavos, ex: R$ 10,00 -> 1000
    }
    ```
-   **Retorno**: detalhes do participante recém-criado.
    ```tsx
    {
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
        balance: number; // em centavos, ex: R$ 10,00 -> 1000
    }
    ```

### **POST** `/games`

-   Inicia um novo jogo, com um placar de 0x0 e marcado como em andamento.
-   **Dados Necessários**: nome do time da casa e do time adversário.
    ```tsx
    {
        homeTeamName: string;
        awayTeamName: string;
    }
    ```
-   **Retorno**: informações do jogo criado.
    ```tsx
    {
        id: number;
        createdAt: string;
        updatedAt: string;
        homeTeamName: string;
        awayTeamName: string;
        homeTeamScore: number; // inicial 0
        awayTeamScore: number; // inicial 0
        isFinished: boolean; // inicial false
    }
    ```

### **POST** `/bets`

-   Permite que um participante faça uma aposta em um jogo específico, descontando o valor apostado do seu saldo.
-   **Dados Necessários**:
    ```tsx
    {
        homeTeamScore: number;
        awayTeamScore: number;
        amountBet: number; // em centavos, ex: R$ 10,00 -> 1000
        gameId: number;
        participantId: number;
    }
    ```
-   **Retorno**: detalhes da aposta realizada.
    ```tsx
    {
        id: number;
        createdAt: string;
        updatedAt: string;
        homeTeamScore: number;
        awayTeamScore: number;
        amountBet: number; // em centavos, ex: R$ 10,00 -> 1000
        gameId: number;
        participantId: number;
        status: string; // PENDING, WON ou LOST
        amountWon: number || null; // null se PENDING; valor em centavos se WON ou LOST
    }
    ```

### **POST** `/games/:id/finish`

-   Encerra um jogo e atualiza as apostas relacionadas, calculando ganhos e atualizando saldos dos vencedores.
-   **Dados Necessários**: placar final do jogo.
    ```tsx
    {
        homeTeamScore: number;
        awayTeamScore: number;
    }
    ```
-   **Retorno**: informações atualizadas do jogo.
    ```tsx
    {
        id: number;
        createdAt: string;
        updatedAt: string;
        homeTeamName: string;
        awayTeamName: string;
        homeTeamScore: number;
        awayTeamScore: number;
        isFinished: boolean;
    }
    ```

### **GET** `/participants`

-   Lista todos os participantes e seus saldos.
-   **Retorno**: lista contendo todos os participantes.
    ```tsx
    [
        {
            id: number;
            createdAt: string;
            updatedAt: string;
            name: string;
            balance: number; // em centavos, ex: R$ 10,00 -> 1000
        },
        {...}
    ]
    ```

### **GET** `/games`

-   Apresenta todos os jogos registrados.
-   **Retorno**: lista de todos os jogos.
    ```tsx
    [
        {
            id: number;
            createdAt: string;
            updatedAt: string;
            homeTeamName: string;
            awayTeamName: string;
            homeTeamScore: number;
            awayTeamScore: number;
            isFinished: boolean;
        },
        {...}
    ]
    ```

### **GET** `/games/:id`

-   Mostra detalhes de um jogo específico e as apostas associadas a ele.
-   **Retorno**: detalhes do jogo incluindo apostas feitas.
    ```tsx
    {
        id: number;
        createdAt: string;
        updatedAt: string;
        homeTeamName: string;
        awayTeamName: string;
        homeTeamScore: number;
        awayTeamScore: number;
        isFinished: boolean;
        bets: [
            {
                id: number;
                createdAt: string;
                updatedAt: string;
                homeTeamScore: number;
                awayTeamScore: number;
                amountBet: number; // em centavos, ex: R$ 10,00 -> 1000
                gameId: number;
                participantId: number;
                status: string; // PENDING, WON ou LOST
                amountWon: number || null; // null se PENDING; em centavos se WON ou LOST
            },
            {...}
        ]
    }
    ```



   



