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

    const prompt = `Gere uma descrição criativa e curta para um amigo secreto chamado ${name}. Palavras-chave (opcional): ${keywords}. Seja conciso e envolvente.`;

    try {
      const geminiModel = genAI.getModel({ model });
      const result = await geminiModel.generateContent([prompt]);
      const response = result.response;
      const description = response.candidates[0].content.parts[0].text;

      res.status(200).json({ description });
    } catch (error) {
      console.error("Erro ao chamar a API do Gemini:", error);
      res.status(500).json({ error: "Erro ao gerar a descrição." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido. Use POST." });
  }
};