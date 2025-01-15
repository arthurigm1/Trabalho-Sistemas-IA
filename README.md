
Sistema Especialista IA - Software de Criação de Sistemas Especialistas
Este projeto é uma aplicação web para criação e execução de sistemas especialistas, desenvolvido utilizando JavaScript puro com armazenamento local via localStorage. O objetivo é fornecer uma ferramenta que permita aos usuários construir sistemas especialistas, cadastrar fatos, regras, e gerenciar o processo de execução de inferências.

Funcionalidades
Cadastro de Variáveis e Valores: Permite cadastrar variáveis multivaloradas, univaloradas e numéricas, bem como seus valores.
Cadastro de Regras e Condições: O sistema permite a criação de regras com condições e ações (então), baseado nos valores das variáveis.
Motor de Execução de Regras: As regras são avaliadas e executadas com base nas variáveis definidas. O motor realiza a inferência, seguindo as condições definidas nas regras.
Motor de Explicação: Permite a explicação do processo de execução das regras.
Interação com o Usuário: O sistema solicita informações sobre variáveis e valores ao usuário, e não repete perguntas.
Execução de Projetos Independentes: Cada projeto de sistema especialista é isolado, garantindo que um projeto não interfira no funcionamento de outro.
Tecnologias
JavaScript Puro: Utilizado para manipulação da lógica do sistema e interação com o DOM.
localStorage: Banco de dados local utilizado para armazenar variáveis, regras e dados do sistema.
HTML & CSS: Para construção da interface gráfica da aplicação.
Bootstrap: Framework CSS para estilização da interface e responsividade.
Como Funciona
A aplicação possui as seguintes seções principais:

Inicio: Apresentação do projeto e informações gerais.
Variáveis: Cadastro de variáveis e seus valores, com possibilidade de atribuição de valores para cada variável.
Regras: Definição de regras com condições e ações (então), permitindo criar a lógica do sistema especialista.
Perguntas: Permite ao usuário cadastrar perguntas relacionadas às variáveis do sistema, para que o motor de inferência faça deduções com base nas respostas.
Execução: Quando o sistema é executado, as regras são avaliadas e as ações são tomadas conforme a lógica definida.
Como Usar
Acesse o Sistema: Acesse o site em Sistema Especialista IA.
Cadastro de Variáveis: Vá até a seção "Variáveis" e insira o nome da variável, seu tipo (multivalorada, univalorada ou numérica) e seus valores.
Cadastro de Regras: Em "Regras", crie as condições e ações para as regras do seu sistema especialista.
Definir Perguntas: Em "Perguntas", defina perguntas sobre as variáveis, que serão feitas ao usuário durante a execução do sistema.
Execução do Sistema: Clique em "Executar" para iniciar a execução do sistema, onde as regras serão avaliadas e as ações realizadas.
Resultados: O sistema exibirá os resultados com base nas regras e inferências feitas.
Armazenamento de Dados
O sistema utiliza o localStorage para armazenar os dados, como variáveis, valores e regras, de forma persistente no navegador. Isso garante que, mesmo após o fechamento do navegador, os dados sejam mantidos. Abaixo estão as chaves utilizadas para armazenar os dados:

variaveis: Armazena as variáveis e seus valores.
regras: Armazena as regras definidas com as condições e ações.
respostas: Armazena as respostas fornecidas pelo usuário.
Exemplo de Uso
Cadastro de Variáveis
Nome: Temperatura
Tipo: Numérica
Valores: [10, 20, 30, 40]
Cadastro de Regras
Condição: Se a Temperatura é maior que 30
Ação: Ligar o ar-condicionado
Pergunta ao Usuário
Pergunta: Qual a temperatura atual?
Contribuições
Se desejar contribuir para o projeto, siga estas etapas:

Faça um fork do repositório.
Crie uma branch para a sua feature (git checkout -b feature/nome-da-feature).
Faça as alterações necessárias e adicione os arquivos alterados (git add .).
Faça um commit com uma mensagem clara (git commit -m 'Adicionando nova funcionalidade').
Faça um push para a sua branch (git push origin feature/nome-da-feature).
Abra um Pull Request no repositório principal.
License
Este projeto está licenciado sob a MIT License - consulte o arquivo LICENSE para mais detalhes.

Autor: Arthur - Trabalho IA Tecnologias: JavaScript, HTML, CSS, localStorage Projeto: Sistema Especialista IA para construção e execução de sistemas especialistas.
