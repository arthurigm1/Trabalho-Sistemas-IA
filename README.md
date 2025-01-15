# Sistema Especialista IA - Software de Criação de Sistemas Especialistas

Este projeto é um **Sistema Especialista Inteligente (IA)** desenvolvido com **JavaScript puro**, com armazenamento local utilizando **localStorage**. A aplicação permite a criação e execução de sistemas especialistas, utilizando regras, fatos e inferência para tomar decisões automáticas baseadas em dados fornecidos pelo usuário.

## 🎯 Objetivo

O objetivo principal deste projeto é criar uma plataforma para **desenvolvimento de sistemas especialistas**, permitindo:

- Cadastro de **variáveis** com valores específicos.
- Definição de **regras** baseadas em condições e ações.
- Execução das regras e inferência de dados a partir das informações fornecidas.
- Um **motor de explicação** para detalhar as ações tomadas pelo sistema.
- Isolamento entre diferentes **projetos** de sistemas especialistas, sem interferência entre eles.

## 🚀 Funcionalidades

- **Cadastro de Variáveis**: Permite que o usuário crie variáveis que podem ser usadas nas regras.
- **Definição de Regras**: O sistema permite a criação de regras com condições (baseadas em variáveis) e ações a serem tomadas.
- **Execução de Regras**: O motor de inferência é responsável por executar as regras, verificar condições e gerar ações com base nos dados disponíveis.
- **Perguntas ao Usuário**: O sistema faz perguntas ao usuário para coletar os valores das variáveis.
- **Explicação de Decisões**: O motor de explicação fornece um detalhamento das decisões tomadas pelo sistema especialista.
- **Armazenamento Local**: Todos os dados (variáveis, valores, regras, projetos) são armazenados no `localStorage` para persistência entre sessões.

## 🖥️ Tecnologias Utilizadas

- **HTML5**: Estrutura do projeto.
- **CSS3**: Estilização e layout responsivo.
- **JavaScript**: Lógica do sistema e interação com o usuário.
- **localStorage**: Armazenamento dos dados localmente no navegador.

## 📸 Como Funciona

### Fluxo do Sistema

1. **Cadastro de Variáveis**: O usuário define as variáveis do sistema (por exemplo, "Temperatura", "Pressão").
2. **Definição de Regras**: Com base nas variáveis, o usuário pode criar regras com condições (ex: "Se a Temperatura > 30°C, então 'Ação: Ligar ventilador'").
3. **Execução de Regras**: O sistema avalia as condições e executa as ações definidas nas regras.
4. **Inferência e Explicação**: O sistema fornece uma explicação das decisões tomadas com base nas regras.
5. **Isolamento de Projetos**: Cada projeto de sistema especialista é isolado, evitando interferências entre eles.

### Exemplo de Uso

1. **Cadastrar uma variável**: O usuário define uma variável, por exemplo, `Temperatura`, e pode indicar se ela é `Numérica` ou `Multivalorada`.
2. **Definir uma regra**: O usuário cria uma regra onde a variável `Temperatura` é comparada a um valor, e dependendo da condição, uma ação é tomada (ex: `Ligar ventilador`).
3. **Executar o sistema**: O sistema executa as regras, faz as inferências necessárias e interage com o usuário para coletar mais dados, se necessário.
4. **Explicação das ações**: Após a execução, o sistema explica o motivo de cada decisão tomada.

## 🌐 Acesso Online
Você pode acessar o projeto no seguinte link: [Projeto Sistema Especialista IA.](https://cotemigtrabalhoia.netlify.app/)
## 🛠️ Como Rodar o Projeto

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/arthurigm1/sistema-especialista-ia.git
