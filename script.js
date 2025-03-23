async function getAIDescription(name, keywords) {
  try {
    const response = await fetch('/api/generateDescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, keywords }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao chamar a função serverless:', errorData.error);
      return { description: `Não foi possível gerar uma descrição para ${name}.`, message: '' }; // Retorna um objeto com ambas as propriedades
    }

    const data = await response.json();
    return data; // Retorna o objeto completo { description, message }

  } catch (error) {
    console.error('Erro ao enviar dados para a função serverless:', error);
    return { description: `Não foi possível gerar uma descrição para ${name}.`, message: '' }; // Retorna um objeto com ambas as propriedades em caso de erro
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

        // *** NOVO: Chama a API do Gemini para obter a descrição e a mensagem ***
        try {
            const aiResult = await getAIDescription(name, keywords);
            descriptionInput.value = aiResult.description;
            li.dataset.message = aiResult.message; // *** ARMAZENA A MENSAGEM NO DATASET DO LI ***
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

function importNames() {
    const fileInput = document.getElementById('fileInput');
    const nameList = document.getElementById('nameList');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const fileContent = event.target.result;
            const fileExtension = file.name.split('.').pop().toLowerCase();
            let names =;

            if (fileExtension === 'txt') {
                names = fileContent.split('\n').map(name => name.trim()).filter(name => name !== '');
            } else if (fileExtension === 'csv') {
                // Assume que os nomes estão na primeira coluna de cada linha
                names = fileContent.split('\n').map(row => row.split(',')[0]?.trim()).filter(name => name !== '');
                // Remove a primeira linha se ela parecer ser um cabeçalho (opcional)
                if (names.length > 0 && names[0].toLowerCase().includes('nome')) {
                    names.shift();
                }
            } else {
                alert('Formato de arquivo não suportado. Use .txt ou .csv.');
                return;
            }

            // Limpa a lista de nomes atual
            nameList.innerHTML = '';

            // Adiciona os nomes da lista
            names.forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                nameList.appendChild(li);
            });

            alert(`Importados ${names.length} nomes.`);
        };

        reader.onerror = function() {
            alert('Erro ao ler o arquivo.');
        };

        reader.readAsText(file);
    } else {
        alert('Por favor, selecione um arquivo.');
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
            description: descriptionElement ? descriptionElement.textContent : '',
            message: li.dataset.message // *** RECUPERA A MENSAGEM DO DATASET ***
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
        listItem.dataset.mensagem = giver.message; // *** ARMAZENA A MENSAGEM NO DATASET DO ITEM DO RESULTADO ***

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
    const message = event.currentTarget.dataset.mensagem; // Recupera a mensagem do dataset
    const modal = document.getElementById('descriptionModal');
    const modalDescription = document.getElementById('modalDescription');
    const modalMessage = document.getElementById('modalMessage'); // Elemento para a mensagem
    const closeButton = document.querySelector('.close-button');

    if (modal && modalDescription && modalMessage) {
        modalDescription.textContent = description;
        modalMessage.textContent = message; // Exibe a mensagem no modal
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