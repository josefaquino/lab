# Amigo Secreto com IA

Este projeto é uma aplicação web para organizar um sorteio de amigo secreto com a funcionalidade adicional de gerar descrições criativas para os participantes utilizando inteligência artificial, agora com a segurança da API Key protegida através de uma função serverless no Vercel.

## Funcionalidades

- **Adicionar nomes:** Permite aos usuários inserir nomes de amigos em um campo de texto e adicioná-los a uma lista.
- **Adicionar palavras-chave (opcional):** Permite aos usuários adicionar palavras-chave ou interesses para cada amigo, que serão usados pela IA para gerar uma descrição mais personalizada.
- **Validação de entrada:** Garante que o campo de entrada de nome não esteja vazio antes de adicionar um nome.
- **Visualizar a lista:** Exibe os nomes inseridos em uma lista visível na página, juntamente com um campo para a descrição gerada pela IA e um botão para inserir essa descrição.
- **Geração de descrição com IA (via Vercel Function):** Utiliza a API do Google Gemini para gerar automaticamente descrições criativas para cada participante, com base no nome e nas palavras-chave fornecidas. A chamada para a API é feita de forma segura através de uma função serverless hospedada no Vercel.
- **Inserir descrição:** Permite ao usuário inserir ou editar a descrição gerada pela IA para cada amigo.
- **Sorteio aleatório:** Realiza um sorteio aleatório para selecionar um dos nomes da lista e exibe o resultado.
- **Visualizar descrição:** Ao clicar no resultado do sorteio, uma janela modal exibe a descrição do amigo secreto sorteado.

## Instalação

1. Clone este repositório em sua máquina local usando o comando:
   ```bash
   git clone [https://github.com/josefaquino/lab.git](https://github.com/josefaquino/lab.git)

   ## Como Executar

**Você pode acessar a aplicação Amigo Secreto com IA diretamente no Vercel através deste link:**

[https://lab-azdgklq3j-jose-r-aquino-araujos-projects.vercel.app/](https://lab-azdgklq3j-jose-r-aquino-araujos-projects.vercel.app/)

1. Faça o deploy deste projeto no Vercel (você precisará de uma conta no Vercel e conectar seu repositório GitHub).
2. Configure uma variável de ambiente chamada `GEMINI_API_KEY` nas configurações do seu projeto no Vercel e coloque a sua chave de API do Google Gemini como valor.
3. Após o deploy bem-sucedido, acesse a URL fornecida pelo Vercel.
4. Digite o nome de um amigo no campo de entrada.
5. Se desejar, digite palavras-chave ou interesses para esse amigo no campo "Palavras-chave (opcional)".
6. Clique no botão "Adicionar" para adicionar o nome e as palavras-chave à lista.
7. Uma descrição será gerada pela IA através da função serverless e aparecerá em um campo de texto ao lado do nome. Você pode editar essa descrição se desejar e clicar no botão "Inserir" para salvá-la.
8. Repita os passos 4 a 7 para adicionar mais nomes.
9. Clique no botão "Sortear Amigo" para realizar o sorteio aleatório.
10. O resultado do sorteio será exibido na tela. Clique em um dos resultados para ver a descrição do amigo secreto sorteado em uma janela modal.