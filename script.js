// Variáveis para armazenar fatos e regras
let facts = [];
let rules = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Carregar fatos e regras cadastrados
    await loadFacts();
    await loadRules();
});

// Função para carregar fatos cadastrados
async function loadFacts() {
    const factsList = document.getElementById('factsList');
    factsList.innerHTML = '';

    facts.forEach((fact, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.textContent = fact;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', async () => {
            await deleteFact(index);
            await loadFacts();
        });

      //  listItem.appendChild(deleteButton);
     //   factsList.appendChild(listItem);
    });
}

// Função para cadastrar um novo fato
document.getElementById('factForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fact = document.getElementById('factInput').value.trim();

    if (!fact) return;

    facts.push(fact);
    document.getElementById('factInput').value = '';
    await loadFacts();
});

// Função para excluir um fato
async function deleteFact(index) {
    facts.splice(index, 1);
}

// Função para carregar regras cadastradas
async function loadRules() {
    const rulesList = document.getElementById('rulesList');
    rulesList.innerHTML = '';

    rules.forEach((rule, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');

        // Montando a string da regra para exibição
        const ruleText = `Regra ${index + 1}: Se ${rule.antecedentes} então ${rule.consequente}`;
        listItem.textContent = ruleText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', async () => {
            await deleteRule(index);
            await loadRules();
        });

        listItem.appendChild(deleteButton);
        rulesList.appendChild(listItem);
    });
}


// Função para cadastrar uma nova regra
document.getElementById('ruleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const rule = document.getElementById('ruleInput').value.trim();

    if (!rule) return;

    // Dividindo a regra em antecedentes e consequente
    const [antecedentes, consequente] = rule.split(' então ');

    // Adicionando os antecedentes e o consequente como uma regra
    rules.push({ antecedentes: antecedentes.trim(), consequente: consequente.trim() });

    document.getElementById('ruleInput').value = '';
    await loadRules();
});

// Função para excluir uma regra
async function deleteRule(index) {
    rules.splice(index, 1);
}

// Função para fazer uma pergunta
document.getElementById('questionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = document.getElementById('questionInput').value.trim();

    if (!question) return;

    const answer = infer(question);
    document.getElementById('answer').textContent = answer;
});

// Função para inferir uma resposta com base nos fatos e regras
function infer(question) {
    // Lógica de inferência aqui (implementação simulada)
    // Aqui, retornaremos uma resposta aleatória
    const answers = ['Sim', 'Não', 'Talvez', 'Preciso de mais informações'];
    return answers[Math.floor(Math.random() * answers.length)];
}
