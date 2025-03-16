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
    // Mantém a função drawName() como está (sem alterações)
    const nameListElement = document.getElementById('nameList');
    const nameElements = nameListElement.querySelectorAll('li span');
    const names = Array.from(nameElements).map(span => span.textContent);

    if (names.length < 2) {
        alert("Adicione pelo menos dois amigos para o sorteio!");
        return;
    }

    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    let resultText = "";
    for (let i = 0; i < shuffledNames.length; i++) {
        const giver = shuffledNames[i];
        const receiver = shuffledNames[(i + 1) % shuffledNames.length];
        resultText += `${giver} vai presentear ${receiver}.<br>`;
    }
    document.getElementById("result").innerHTML = resultText;
}
function drawName() {
    // Mantém a função drawName() como está
    const nameListElement = document.getElementById('nameList');
    const nameElements = nameListElement.querySelectorAll('li span');
    const names = Array.from(nameElements).map(span => span.textContent);

    if (names.length < 2) {
        alert("Adicione pelo menos dois amigos para o sorteio!");
        return;
    }

    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    let resultText = "";
    for (let i = 0; i < shuffledNames.length; i++) {
        const giver = shuffledNames[i];
        const receiver = shuffledNames[(i + 1) % shuffledNames.length];
        resultText += `${giver} vai presentear ${receiver}.<br>`;
    }
    document.getElementById("result").innerHTML = resultText;
}