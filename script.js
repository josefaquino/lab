function getCreativeDescription(name) {
    // *** VERSÃO INICIAL E SIMPLIFICADA - APENAS PARA TESTE ***
    // *** SUBSTITUIREMOS ISSO PELA INTERAÇÃO REAL COM A IA DEPOIS ***

    // Aqui, vamos simular que a IA gerou uma descrição baseada no nome.
    // Por enquanto, vamos retornar descrições fixas e genéricas para alguns nomes,
    // e uma descrição padrão para os outros.

    if (name === "Ana") {
        return "Alegre como um dia de sol, ilumina qualquer amigo secreto!";
    } else if (name === "Carlos") {
        return "Sempre com um sorriso no rosto, vai contagiar o amigo secreto com alegria!";
    } else if (name === "Maria") {
        return "Cheia de mistério e surpresas, prepare-se para um presente incrível!";
    } else {
        return "Uma pessoa especial que vai tornar o amigo secreto ainda mais divertido!"; // Descrição padrão para outros nomes
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