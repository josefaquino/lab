function getCreativeDescription(name) {
    // *** VERSÃO MODIFICADA PARA OPÇÃO 2 - USAR PROMPT PARA INSERIR DESCRIÇÃO DA IA ***
    const promptMessage = `**[IA Description Needed]** \n\nPeça uma descrição criativa e engraçada para "${name}" na conversa com a IA.\n\nCole a descrição gerada pela IA aqui e clique em OK:\n(Ou clique em Cancelar para usar uma descrição padrão)`;
    const userDescription = prompt(promptMessage, "Descrição criativa da IA aqui..."); // Prompt com mensagem e valor padrão

    if (userDescription && userDescription.trim() !== "") {
        // Se o usuário digitou algo e clicou em OK, use a descrição fornecida
        return userDescription.trim();
    } else {
        // Se o usuário cancelou ou não digitou nada, use uma descrição padrão
        return "(Descrição padrão - peça uma descrição criativa para a IA da próxima vez!)";
    }
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

        const descriptionP = document.createElement("p");
        descriptionP.classList.add("descricao-amigo");

        // *** NOVO: Chama a função para obter a descrição criativa ***
        const creativeDescription = getCreativeDescription(name);
        descriptionP.textContent = creativeDescription; // Usa a descrição retornada pela função

        li.appendChild(descriptionP);

        nameList.appendChild(li);
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

    if (names.length < 2) {
        alert("Adicione pelo menos dois amigos para o sorteio!");
        return;
    }

    const shuffledNames = [...names].sort(() => Math.random() - 0.5); // Garante que não estamos modificando o array original diretamente
    let resultText = "";
    for (let i = 0; i < shuffledNames.length; i++) {
        const giver = shuffledNames[i];
        const receiver = shuffledNames[(i + 1) % shuffledNames.length]; // Pega o próximo nome, e volta para o primeiro no final
        resultText += `${giver} vai presentear ${receiver}.<br>`;
    }
    document.getElementById("result").innerHTML = resultText;
}