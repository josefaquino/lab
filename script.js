function getAIDescription(name) {
    // *** SIMULAÇÃO SIMPLIFICADA DA IA GERANDO DESCRIÇÃO ***
    // *** VERSÃO INICIAL - DESCRIÇÕES FIXAS E GENÉRICAS ***

    return new Promise(resolve => { // Retorna uma Promise para simular tempo de espera
        setTimeout(() => {
            let description = "";
            if (name === "Ana") {
                description = "Uma amiga secreta que ilumina qualquer ambiente com sua alegria!";
            } else if (name === "Carlos") {
                description = "Prepare-se para boas risadas e um presente criativo do Carlos!";
            } else if (name === "Maria") {
                description = "Mistério e carinho definem o presente da Maria para o amigo secreto.";
            } else {
                description = `Um presente especial de ${name} para um amigo sortudo!`; // Descrição genérica
            }
            resolve(description); // Resolve a Promise com a descrição após o delay
        }, 1500); // Delay de 1.5 segundos (simulando o tempo de "processamento" da IA)
    });
}


function addName() {
    const nameInput = document.getElementById("nameInput");
    const nameList = document.getElementById("nameList");
    const name = nameInput.value.trim();

    if (name !== "") {
        const li = document.createElement("li");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        li.appendChild(nameSpan);

        // *** NOVO: Container para a descrição ***
        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("descricao-container");

        // *** Campo de input para descrição ***
        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.classList.add("descricao-input");
        descriptionInput.placeholder = "Aguardando IA..."; // MODIFICADO: Placeholder inicial

        // *** Botão "Inserir Descrição" ***
        const insertDescriptionButton = document.createElement("button");
        insertDescriptionButton.textContent = "Inserir";
        insertDescriptionButton.classList.add("insert-description-button");
        insertDescriptionButton.disabled = true; // Inicialmente desabilitado até a IA "responder"

        // *** Adiciona input e botão ao container ***
        descriptionContainer.appendChild(descriptionInput);
        descriptionContainer.appendChild(insertDescriptionButton);
        li.appendChild(descriptionContainer);

        // *** Botão "Remover" ***
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

        // *** NOVO: Simula a obtenção da descrição da IA ***
        descriptionInput.placeholder = "Gerando descrição..."; // MODIFICADO: Placeholder durante a geração
        getAIDescription(name).then(creativeDescription => { // Chama a função de simulação da IA
            descriptionInput.value = creativeDescription; // Preenche o input com a descrição "gerada"
            descriptionInput.placeholder = "Pedir descrição para IA e colar aqui"; // Restaura o placeholder original (opcional)
            insertDescriptionButton.disabled = false; // Habilita o botão "Inserir" novamente após receber a descrição
        });

         // *** Evento de clique para o botão "Inserir Descrição" (mantém como antes, mas agora habilitado dinamicamente) ***
        insertDescriptionButton.addEventListener('click', function() {
            const descriptionText = descriptionInput.value.trim();
            if (descriptionText !== "") {
                const descriptionP = document.createElement("p");
                descriptionP.classList.add("descricao-amigo");
                descriptionP.textContent = descriptionText;

                descriptionContainer.innerHTML = '';
                descriptionContainer.appendChild(descriptionP);

                insertDescriptionButton.disabled = true;
            } else {
                alert("Por favor, insira uma descrição antes de clicar em 'Inserir'.");
            }
        });


    } else {
        alert('Por favor, insira um nome.');
    }
}

function drawName() {
    // Mantém a função drawName() como está (sem alterações)
    const nameListElement = document.getElementById('nameList');
    const nameElements = nameListElement.querySelectorAll('li span');
    const names = Array.from(nameElements).map(span => span.textContent);
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = '';

    if (names.length < 2) {
        alert("Adicione pelo menos dois amigos para o sorteio!");
        return;
    }

    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledNames.length; i++) {
        const giver = shuffledNames[i];
        const receiver = shuffledNames[(i + 1) % shuffledNames.length];
        const listItem = document.createElement('li');
        listItem.textContent = `${giver} vai presentear ${receiver}.`;
        resultList.appendChild(listItem);
    }
    const resultParagraph = document.getElementById('result');
    if (resultParagraph) {
        resultParagraph.innerHTML = '';
    }
}
