const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');
const result = document.getElementById('result');
let amigos = []; // Declaração do array para armazenar os nomes

function addName() {
    // Capturar o valor do campo de entrada
    const name = nameInput.value.trim();
    
    // Validar a entrada
    if (name) {
        // Atualizar o array de amigos
        amigos.push(name);
        
        // Atualizar a lista HTML
        updateNameList();
        
        // Limpar o campo de entrada
        nameInput.value = '';
        nameInput.focus();
    } else {
        // Exibir alerta se o campo estiver vazio
        alert('Por favor, insira um nome.');
    }
}

function updateNameList() {
    // Limpar a lista existente
    nameList.innerHTML = '';

    // Percorrer o array e adicionar cada nome como um elemento <li>
    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement('li');
        li.textContent = amigos[i];
        nameList.appendChild(li);
    }
}

function drawName() {
    if (amigos.length === 0) {
        alert('A lista está vazia. Adicione nomes antes de sortear.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * amigos.length);
    const secretFriend = amigos[randomIndex];
    result.textContent = `O amigo secreto é: ${secretFriend}`;
}
