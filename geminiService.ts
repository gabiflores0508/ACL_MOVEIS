
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é o Consultor Técnico de Projetos da ACL Móveis Planejados. 
Sua especialidade é ajudar clientes a idealizar ambientes sob medida (Cozinhas, Dormitórios, Salas, etc.).

Diretrizes de Atendimento:
1. FOCO EM PLANEJADOS: Fale sobre aproveitamento de espaço, materiais (MDF, acabamentos), ferragens e funcionalidade.
2. ESTILO ACL: Sugira designs modernos que utilizam a paleta da marca (vermelho de destaque, preto elegante e tons neutros).
3. TÉCNICO E INSPIRADOR: Se o usuário enviar uma foto de um ambiente vazio ou antigo, analise pontos de melhoria e sugira uma disposição de móveis planejados.
4. FLUXO DE VENDA: Encoraje o usuário a agendar uma visita ao showroom ou solicitar um orçamento detalhado após a consultoria.

Use um tom profissional, atencioso e técnico. Responda sempre em Português do Brasil.
`;

export interface ChatContent {
  role: 'user' | 'model';
  text: string;
  image?: string;
  grounding?: any[];
}

export const getDesignAdvice = async (userMessage: string, history: ChatContent[], base64Image?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const formattedHistory = history.map(h => ({
    role: h.role,
    parts: [
      ...(h.image ? [{ inlineData: { mimeType: 'image/jpeg', data: h.image } }] : []),
      { text: h.text }
    ]
  }));

  const userParts: any[] = [{ text: userMessage }];
  if (base64Image) {
    userParts.push({
      inlineData: { mimeType: 'image/jpeg', data: base64Image }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...formattedHistory,
        { role: 'user', parts: userParts }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      }
    });

    return {
      text: response.text || "Desculpe, tive um problema ao processar seu pedido de projeto.",
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Estamos com alta demanda em nossos servidores de projeto. Por favor, tente novamente em instantes.", grounding: [] };
  }
};
