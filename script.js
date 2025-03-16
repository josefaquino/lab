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
        descriptionInput.placeholder = "Pedir descrição para IA e colar aqui";

        // *** NOVO: Botão "Inserir Descrição" ***
        const insertDescriptionButton = document.createElement("button");
        insertDescriptionButton.textContent = "Inserir";
        insertDescriptionButton.classList.add("insert-description-button");

        // *** Evento de clique para o botão "Inserir Descrição" ***
        insertDescriptionButton.addEventListener('click', function() {
            descriptionInput.placeholder = "Descrição Inserida!"; // Muda o placeholder para indicar sucesso
            descriptionInput.disabled = true; // Opcional: Desabilita o input após inserir (pode ser removido se não quiser)
            insertDescriptionButton.disabled = true; // Desabilita o botão após clicar
        });


        li.appendChild(descriptionInput);
        li.appendChild(insertDescriptionButton); // Adiciona o botão ao LI

        // *** NOVO: Adiciona o LI NO TOPO da lista (prepend) ***
        nameList.prepend(li); // Usar prepend para adicionar no início da lista

        nameInput.value = "";
        nameInput.focus();
    } else {
        alert('Por favor, insira um nome.');
    }
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