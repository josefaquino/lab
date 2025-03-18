# Amigo Secreto com IA

Este projeto é uma aplicação web para organizar um sorteio de amigo secreto com a funcionalidade adicional de gerar descrições criativas para os participantes utilizando inteligência artificial. Os usuários podem inserir nomes de amigos, adicionar palavras-chave (opcionalmente) e, em seguida, realizar um sorteio aleatório para determinar quem será o "amigo secreto". As descrições geradas podem ajudar a dar ideias de presentes.

## Funcionalidades

- **Adicionar nomes:** Permite aos usuários inserir nomes de amigos em um campo de texto e adicioná-los a uma lista.
- **Adicionar palavras-chave (opcional):** Permite aos usuários adicionar palavras-chave ou interesses para cada amigo, que serão usados pela IA para gerar uma descrição mais personalizada.
- **Validação de entrada:** Garante que o campo de entrada de nome não esteja vazio antes de adicionar um nome.
- **Visualizar a lista:** Exibe os nomes inseridos em uma lista visível na página, juntamente com um campo para a descrição gerada pela IA e um botão para inserir essa descrição.
- **Geração de descrição com IA:** Utiliza a API do Google Gemini para gerar automaticamente descrições criativas para cada participante, com base no nome e nas palavras-chave fornecidas.
- **Inserir descrição:** Permite ao usuário inserir ou editar a descrição gerada pela IA para cada amigo.
- **Sorteio aleatório:** Realiza um sorteio aleatório para selecionar um dos nomes da lista e exibe o resultado.
- **Visualizar descrição:** Ao clicar no resultado do sorteio, uma janela modal exibe a descrição do amigo secreto sorteado.

## Instalação

1. Clone este repositório em sua máquina local usando o comando:
   ```bash
   git clone [https://github.com/josefaquino/amigo-secreto.git](https://github.com/josefaquino/lab.git)