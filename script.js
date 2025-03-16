function addName() {
    const nameInput = document.getElementById("nameInput");
    const nameList = document.getElementById("nameList");
    const name = nameInput.value.trim();

    if (name !== "") {
        const li = document.createElement("li");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        li.appendChild(nameSpan);

        // *** NOVO: Cria o campo de input para a descrição ***
        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.classList.add("descricao-input"); // Adiciona uma classe CSS para estilizar (opcional)
        descriptionInput.placeholder = "Pedir descrição para IA e colar aqui"; // Texto placeholder
        li.appendChild(descriptionInput);

        // *** Cria o botão "Remover" (mantendo da versão anterior) ***
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener('click', function() {
            li.remove();
        });
        li.appendChild(removeButton);

        nameList.appendChild(li);
        nameInput.value = "";
        nameInput.focus();
    } else {
        alert('Por favor, insira um nome.');
    }
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