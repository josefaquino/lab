function addName() {
    const nameInput = document.getElementById("nameInput");
    const nameList = document.getElementById("nameList");
    const name = nameInput.value.trim();

    if (name !== "") {
        const li = document.createElement("li");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        li.appendChild(nameSpan);

        // *** NOVO: Container para a descrição (vai conter o input e depois o <p>) ***
        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("descricao-container"); // Classe para agrupar input e descrição

        // *** Campo de input para descrição ***
        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.classList.add("descricao-input");
        descriptionInput.placeholder = "Carregando descrição...";

        // *** Botão "Inserir Descrição" ***
        const insertDescriptionButton = document.createElement("button");
        insertDescriptionButton.textContent = "Inserir";
        insertDescriptionButton.classList.add("insert-description-button");

        // *** Evento de clique para o botão "Inserir Descrição" ***
        insertDescriptionButton.addEventListener('click', function() {
            const descriptionText = descriptionInput.value.trim(); // Pega o texto do input
            if (descriptionText !== "") {
                // *** NOVO: Cria um parágrafo para exibir a descrição ***
                const descriptionP = document.createElement("p");
                descriptionP.classList.add("descricao-amigo");
                descriptionP.textContent = descriptionText;

                // *** NOVO: Substitui o input pelo parágrafo de descrição ***
                descriptionContainer.innerHTML = ''; // Limpa o container
                descriptionContainer.appendChild(descriptionP); // Adiciona o parágrafo

                insertDescriptionButton.disabled = true; // Desabilita o botão "Inserir"
            } else {
                alert("Por favor, insira uma descrição antes de clicar em 'Inserir'.");
            }
        });

        descriptionContainer.appendChild(descriptionInput); // Adiciona o input ao container
        descriptionContainer.appendChild(insertDescriptionButton); // Adiciona o botão ao container
        li.appendChild(descriptionContainer); // Adiciona o container ao LI

        // *** Botão "Remover" (mantendo da versão anterior) ***
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener('click', function() {
            li.remove();
        });
        li.appendChild(removeButton);

        nameList.prepend(li);

        nameInput.value = "";
        nameInput.focus();
    } else {
        alert('Por favor, insira um nome.');
    }
}

function drawName() {
    // Mantém a função drawName() como está (sem alterações)
    const nameListElement = document.getElementById('nameList');
    const nameElements = nameListElement.querySelectorAll('li span');
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
        const receiver = shuffledNames[(i + 1) % shuffledNames.length];
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
