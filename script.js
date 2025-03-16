function addName() {
    const nameInput = document.getElementById("nameInput");
    const nameList = document.getElementById("nameList");
    const name = nameInput.value.trim();

    if (name !== "") {
        const li = document.createElement("li");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        li.appendChild(nameSpan);

        // *** NOVO: Campo de input para descrição ***
        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.classList.add("descricao-input");
        // *** MODIFICADO: Placeholder inicial para "Carregando descrição..." ***
        descriptionInput.placeholder = "Carregando descrição...";

        // *** Botão "Inserir Descrição" ***
        const insertDescriptionButton = document.createElement("button");
        insertDescriptionButton.textContent = "Inserir";
        insertDescriptionButton.classList.add("insert-description-button");

        // *** Evento de clique para o botão "Inserir Descrição" ***
        insertDescriptionButton.addEventListener('click', function() {
            descriptionInput.placeholder = "Descrição Inserida!"; // Muda o placeholder para indicar sucesso
            descriptionInput.disabled = true;
            insertDescriptionButton.disabled = true;
        });

        li.appendChild(descriptionInput);
        li.appendChild(insertDescriptionButton);

        nameList.prepend(li);

        nameInput.value = "";
        nameInput.focus();
    } else {
        alert('Por favor, insira um nome.');
    }
}

function drawName() {
    // Modificação para funcionar com a lista de nomes no DOM diretamente
    const nameListElement = document.getElementById('nameList');
    const nameElements = nameListElement.querySelectorAll('li span'); // Pega os spans dentro dos LIs para pegar os nomes
    const names = Array.from(nameElements).map(span => span.textContent);
    const resultList = document.getElementById('result-list'); // Pega a lista de resultados UL
    resultList.innerHTML = ''; // Limpa a lista de resultados antes de gerar novamente

    if (names.length < 2) {
        alert("Adicione pelo menos dois amigos para o sorteio!");
        return;
    }

    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledNames.length; i++) {
        const giver = shuffledNames[i];
        const receiver = shuffledNames[(i + 1) % shuffledNames.length]; // Pega o próximo nome, e volta para o primeiro no final
        const listItem = document.createElement('li'); // Cria um LI para cada par
        listItem.textContent = `${giver} vai presentear ${receiver}.`; // Define o texto do LI
        resultList.appendChild(listItem); // Adiciona o LI à lista de resultados UL
    }
    // Remove o texto antigo do parágrafo de resultado (se ainda existir)
    const resultParagraph = document.getElementById('result');
    if (resultParagraph) {
        resultParagraph.innerHTML = '';
    }
}