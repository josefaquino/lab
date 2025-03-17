function getAIDescription(name) {
    // *** SIMULAÇÃO APRIMORADA DA IA GERANDO DESCRIÇÃO ***
    // *** VERSÃO COM FRASES VARIADAS E MAIS DINÂMICAS ***

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

    const descricoesAna = [
        "Alegria contagiante e um presente cheio de carinho, vindo da Ana!",
        "Diretamente do coração da Ana para o seu Amigo Secreto, prepare-se para sorrir!",
        "A Ana está no Amigo Secreto e promete um presente que vai aquecer seu dia!",
        "Com a Ana no Amigo Secreto, a felicidade é garantida e o presente, especial!",
        "Prepare-se para receber um presente com a doçura e o brilho da Ana!"
    ];

    const descricoesCarlos = [
        "O bom humor do Carlos em forma de presente para o Amigo Secreto. Prepare-se para rir!",
        "Criatividade e alegria? É o Carlos no Amigo Secreto! Aguarde um presente original!",
        "Com o Carlos no Amigo Secreto, a diversão é garantida e o presente, surpreendente!",
        "Prepare-se para um presente com a energia positiva e contagiante do Carlos!",
        "O Carlos está no Amigo Secreto e vai te presentear com algo que é a sua cara: incrível!"
    ];

    const descricoesMaria = [
        "Mistério e elegância no presente da Maria para o Amigo Secreto. Curiosidade no ar!",
        "A Maria entrou no Amigo Secreto e promete um presente com um toque especial e único!",
        "Prepare-se para um presente com a delicadeza e o bom gosto da Maria!",
        "Com a Maria no Amigo Secreto, o encanto é certo e o presente, memorável!",
        "O presente da Maria para o Amigo Secreto? Um toque de magia e muito carinho!"
    ];


    return new Promise(resolve => {
        setTimeout(() => {
            let description = "";
            if (name === "Ana") {
                description = descricoesAna[Math.floor(Math.random() * descricoesAna.length)]; // Escolhe aleatoriamente de descricoesAna
            } else if (name === "Carlos") {
                description = descricoesCarlos[Math.floor(Math.random() * descricoesCarlos.length)]; // Escolhe aleatoriamente de descricoesCarlos
            } else if (name === "Maria") {
                description = descricoesMaria[Math.floor(Math.random() * descricoesMaria.length)]; // Escolhe aleatoriamente de descricoesMaria
            } else {
                const fraseGenerica = frasesCriativas[Math.floor(Math.random() * frasesCriativas.length)]; // Escolhe frase genérica aleatoriamente
                description = fraseGenerica.replace("[nome]", name); // Substitui [nome] pelo nome real
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
