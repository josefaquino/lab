// api/generateDescription.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("A variável de ambiente GEMINI_API_KEY não está definida.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = "gemini-2.0-flash";

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, keywords } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O nome é obrigatório." });
    }

    const descriptionPrompt = `Gere uma descrição criativa e curta para um amigo secreto chamado ${name}. Palavras-chave (opcional): ${keywords}. Seja conciso e envolvente.`;
    const messagePrompt = `Gere uma mensagem curta e amigável para um amigo secreto chamado ${name}. A mensagem deve ser algo que o presenteador poderia dizer ao revelar o presente.`;

    try {
      const geminiModel = genAI.getModel({ model });

      // Primeira chamada para gerar a descrição
      const descriptionResult = await geminiModel.generateContent([descriptionPrompt]);
      const descriptionResponse = descriptionResult.response;
      const description = descriptionResponse.candidates[0].content.parts[0].text;

      // Segunda chamada para gerar a mensagem
      const messageResult = await geminiModel.generateContent([messagePrompt]);
      const messageResponse = messageResult.response;
      const message = messageResponse.candidates[0].content.parts[0].text;

      res.status(200).json({ description, message }); // Envia ambas as partes na resposta
    } catch (error) {
      console.error("Erro ao chamar a API do Gemini:", error);
      res.status(500).json({ error: "Erro ao gerar a descrição e a mensagem." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido. Use POST." });
  }
};