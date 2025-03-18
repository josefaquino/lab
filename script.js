async function getAIDescription(name, keywords) {
    const apiKey = 'AIzaSyCg6VKxU887z4QTfLBbNorlWx0asVUQmp0'; // SUA CHAVE DE API
    const model = 'gemini-2.0-flash'; // Ou outro modelo que você preferir
    
    const prompt = `Gere uma descrição criativa e curta para um amigo secreto chamado ${name}. Palavras-chave (opcional): ${keywords}. Seja conciso e envolvente.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: {
                    text: prompt
                }
            }),
        });

        if (!response.ok) {
            console.error(`Erro na requisição da API: ${response.status}`);
            return `Não foi possível gerar uma descrição para ${name}.`;
        }

        const data = await response.json();
        const description = data.candidates[0].content.parts[0].text;
        return description;

    } catch (error) {
        console.error(`Erro ao chamar a API do Gemini: ${error}`);
        return `Não foi possível gerar uma descrição para ${name}.`;
    }
}

async function addName() {
    const nameInput = document.getElementById("nameInput");
    const nameList = document.getElementById("nameList");
    const name = nameInput.value.trim();

    if (name !== "") {
        const li = document.createElement("li");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        li.appendChild(nameSpan);

        // *** NOVO: Container para palavras-chave ***
        const keywordsContainer = document.createElement("div");
        keywordsContainer.classList.add("keywords-container");

        const keywordsInput = document.createElement("input");
        keywordsInput.type = "text";
        keywordsInput.classList.add("keywords-input");
        keywordsInput.placeholder = "Palavras-chave (opcional)";
        keywordsContainer.appendChild(keywordsInput);
        li.appendChild(keywordsContainer);

        // *** NOVO: Container para a descrição ***
        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("descricao-container");

        // *** Campo de input para descrição ***
        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.classList.add("descricao-input");
        descriptionInput.placeholder = "Gerando descrição..."; // MODIFICADO: Placeholder inicial

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

        // *** NOVO: Obter as palavras-chave ***
        const keywords = keywordsInput.value.trim();

        // *** NOVO: Chama a API do Gemini para obter a descrição ***
        try {
            const creativeDescription = await getAIDescription(name, keywords);
            descriptionInput.value = creativeDescription;
            descriptionInput.placeholder = "Pedir descrição para IA e colar aqui";
            insertDescriptionButton.disabled = false;
        } catch (error) {
            descriptionInput.value = "Erro ao gerar descrição.";
            descriptionInput.placeholder = "Erro ao gerar descrição.";
            insertDescriptionButton.disabled = true;
        }


         // *** Evento de clique para o botão "Inserir Descrição" ***
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
    const nameListElement = document.getElementById('nameList');
    const nameItems = nameListElement.querySelectorAll('li');
    const participants = Array.from(nameItems).map(li => {
        const nameSpan = li.querySelector('span');
        const descriptionElement = li.querySelector('.descricao-amigo');
        return {
            name: nameSpan.textContent,
            description: descriptionElement ? descriptionElement.textContent : ''
        };
    });
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = '';

    if (participants.length < 2) {
        alert("Adicione pelo menos dois amigos para o sorteio!");
        return;
    }

    const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledParticipants.length; i++) {
        const giver = shuffledParticipants[i];
        const receiver = shuffledParticipants[(i + 1) % shuffledParticipants.length];
        const listItem = document.createElement('li');
        listItem.classList.add('result-item');

        const giverNameSpan = document.createElement('span');
        giverNameSpan.textContent = giver.name;

        const receiverNameSpan = document.createElement('span');
        receiverNameSpan.textContent = receiver.name;

        listItem.innerHTML = `${giverNameSpan.textContent} vai presentear ${receiverNameSpan.textContent}.`;
        listItem.dataset.descricao = giver.description;

        listItem.addEventListener('click', showDescriptionModal);

        resultList.appendChild(listItem);
    }
    const resultParagraph = document.getElementById('result');
    if (resultParagraph) {
        resultParagraph.innerHTML = '';
    }
}

function showDescriptionModal(event) {
    const description = event.currentTarget.dataset.descricao;
    const modal = document.getElementById('descriptionModal');
    const modalDescription = document.getElementById('modalDescription');
    const closeButton = document.querySelector('.close-button');

    if (modal && modalDescription) {
        modalDescription.textContent = description;
        modal.style.display = 'block';
    }

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('descriptionModal');
    if (modal) {
        modal.style.display = 'none';
    }
}