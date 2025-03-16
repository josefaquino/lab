function getCreativeDescription(name) {
    const userDescription = prompt("Insira a descrição aqui:");
    return userDescription || "(Descrição padrão)"; // Se cancelar, usa padrão
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
        const creativeDescription = getCreativeDescription(name);
        descriptionP.textContent = creativeDescription;
        li.appendChild(descriptionP);

        // *** NOVO: Cria o botão "Remover" ***
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.classList.add("remove-button"); // Adiciona uma classe para estilizar (opcional)

        // *** Adiciona um evento de clique para o botão "Remover" ***
        removeButton.addEventListener('click', function() {
            li.remove(); // Remove o <li> pai (que contém o nome, descrição e botão)
        });

        li.appendChild(removeButton); // Adiciona o botão "Remover" ao <li>

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