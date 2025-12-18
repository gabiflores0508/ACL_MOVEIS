
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é o Consultor Técnico de Projetos da ACL Móveis Planejados. 
Sua especialidade é ajudar clientes a idealizar ambientes sob medida de alto padrão.

Diretrizes:
1. FOCO EM LUXO: Sugira materiais nobres, iluminação embutida e soluções inteligentes.
2. TOM DE VOZ: Elegante, técnico, porém acolhedor.
3. CONTEXTO: O site é preto e vermelho escuro. Mencione como essas cores trazem sobriedade e luxo.
4. CALL TO ACTION: Incentive o cliente a ver o portfólio no site ou agendar uma visita técnica.

Responda em Português do Brasil de forma concisa.
`;

export interface ChatContent {
  role: 'user' | 'model';
  text: string;
}

export const getDesignAdvice = async (userMessage: string, history: ChatContent[]) => {
  // Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Correct usage of ai.models.generateContent as per guidelines.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      }
    });

    // Access the .text property directly (not as a method).
    return {
      text: response.text || "Não consegui gerar uma sugestão no momento."
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Desculpe, tive um problema técnico. Vamos conversar por telefone?" };
  }
};
