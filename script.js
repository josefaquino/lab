function getAIDescription(name, keywords) {
    // *** SIMULAÇÃO APRIMORADA DA IA GERANDO DESCRIÇÃO COM PALAVRAS-CHAVE ***

    const frasesCriativas = [
        "Prepare-se para ser surpreendido(a) por [nome]! Um presente único a caminho!",
        "[nome] está no Amigo Secreto! Espere algo divertido e memorável!",
        "Diretamente da lista VIP do Amigo Secreto, [nome] vai te presentear!",
        "Alerta de presente incrível vindo de [nome]! Prepare o coração (e o sorriso)!",
        "Dizem por aí que o amigo secreto de [nome] vai amar o presente... Será você?",
        "Com [nome] no Amigo Secreto, a alegria e as boas surpresas estão garantidas!",
        "Segure a ansiedade! [nome] está preparando um presente especial para você!",
        "Um toque de mistério e muita animação: [nome] no Amigo Secreto é pura diversão!",
        "Deixe a curiosidade te guiar... [nome] é seu amigo secreto este ano!",
        "Boas vibrações e um presente show de [nome]! O que será, hein?"
    ];

    const descricoesAna = [ /* ... (mantém as descrições da Ana) ... */ ];
    const descricoesCarlos = [ /* ... (mantém as descrições do Carlos) ... */ ];
    const descricoesMaria = [ /* ... (mantém as descrições da Maria) ... */ ];

    return new Promise(resolve => {
        setTimeout(() => {
            let description = "";
            const lowerCaseKeywords = keywords ? keywords.toLowerCase() : "";

            if (name === "Ana") {
                description = descricoesAna[Math.floor(Math.random() * descricoesAna.length)];
            } else if (name === "Carlos") {
                description = descricoesCarlos[Math.floor(Math.random() * descricoesCarlos.length)];
            } else if (name === "Maria") {
                description = descricoesMaria[Math.floor(Math.random() * descricoesMaria.length)];
            } else if (lowerCaseKeywords.includes("livro") || lowerCaseKeywords.includes("ler") || lowerCaseKeywords.includes("literatura")) {
                description = `Prepare-se para mergulhar em novas histórias! O presente de [nome] pode te levar para mundos incríveis.`;
                description = description.replace("[nome]", name);
            } else if (lowerCaseKeywords.includes("música") || lowerCaseKeywords.includes("som") || lowerCaseKeywords.includes("instrumento")) {
                description = `Atenção, amantes da música! O presente de [nome] pode vibrar na sua frequência.`;
                description = description.replace("[nome]", name);
            } else if (lowerCaseKeywords.includes("jogo") || lowerCaseKeywords.includes("game") || lowerCaseKeywords.includes("videogame")) {
                description = `Prepare-se para o nível máximo de diversão! O presente de [nome] pode te desafiar.`;
                description = description.replace("[nome]", name);
            } else if (lowerCaseKeywords.includes("viagem") || lowerCaseKeywords.includes("viajar") || lowerCaseKeywords.includes("aventura")) {
                description = `Sonhando com novas aventuras? O presente de [nome] pode ser o seu passaporte.`;
                description = description.replace("[nome]", name);
            } else if (lowerCaseKeywords.includes("esporte") || lowerCaseKeywords.includes("academia") || lowerCaseKeywords.includes("futebol") || lowerCaseKeywords.includes("corrida")) {
                description = `Mantenha a energia! O presente de [nome] pode te dar um impulso extra.`;
                description = description.replace("[nome]", name);
            } else if (lowerCaseKeywords.includes("filme") || lowerCaseKeywords.includes("cinema") || lowerCaseKeywords.includes("série")) {
                description = `Prepare a pipoca! O presente de [nome] pode ser uma ótima sessão.`;
                description = description.replace("[nome]", name);
            } else if (lowerCaseKeywords.includes("arte") || lowerCaseKeywords.includes("pintura") || lowerCaseKeywords.includes("desenho")) {
                description = `Criatividade em ação! O presente de [nome] pode inspirar seu lado artístico.`;
                description = description.replace("[nome]", name);
            } else if (lowerCaseKeywords.includes("culinária") || lowerCaseKeywords.includes("cozinhar") || lowerCaseKeywords.includes("receita")) {
                description = `Hummm, que delícia! O presente de [nome] pode ter um sabor especial.`;
                description = description.replace("[nome]", name);
            } else if (lowerCaseKeywords.includes("tecnologia") || lowerCaseKeywords.includes("gadget") || lowerCaseKeywords.includes("eletrônico")) {
                description = `Inovação a caminho! O presente de [nome] pode te deixar conectado(a).`;
                description = description.replace("[nome]", name);
            } else if (keywords) {
                description = `[nome] pensou nos seus interesses! Espere um presente especial relacionado a ${keywords}.`;
                description = description.replace("[nome]", name);
            } else {
                const fraseGenerica = frasesCriativas[Math.floor(Math.random() * frasesCriativas.length)];
                description = fraseGenerica.replace("[nome]", name);
            }
            resolve(description);
        }, 1500);
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

        // *** NOVO: Obter as palavras-chave ***
        const keywords = keywordsInput.value.trim();

        // *** NOVO: Simula a obtenção da descrição da IA com palavras-chave ***
        descriptionInput.placeholder = "Gerando descrição...";
        getAIDescription(name, keywords).then(creativeDescription => {
            descriptionInput.value = creativeDescription;
            descriptionInput.placeholder = "Pedir descrição para IA e colar aqui";
            insertDescriptionButton.disabled = false;
        });

         // *** Evento de clique para o botão "Inserir Descrição" (mantém como antes) ***
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