// Calcul de la similarité cosinus entre deux vecteurs
export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, v, i) => sum + v * (b[i] || 0), 0);
  const normA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const normB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return normA && normB ? dot / (normA * normB) : 0;
}

// Génère un prompt pour le LLM à partir des chunks pertinents
export function buildPrompt(question: string, contextChunks: { text: string; source: string }[]): string {
  return `Réponds à la question en t'appuyant uniquement sur le contexte fourni. Cite les sources utilisées (nom de fichier).\n\nContexte :\n${contextChunks.map((c, i) => `[${c.source}] ${c.text}`).join('\n---\n')}\n\nQuestion : ${question}\n\nRéponse :`;
}

// Appel à l'API OpenAI Chat (modèle économique)
export async function fetchLLMAnswer(prompt: string, apiKey: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-1106-preview',
      messages: [
        { role: 'system', content: 'Tu es un assistant pédagogique qui cite toujours ses sources.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 512,
    }),
  });
  if (!res.ok) throw new Error('Erreur API OpenAI chat');
  const data = await res.json();
  return data.choices[0].message.content;
}
// Appel à l'API OpenAI pour obtenir l'embedding d'un texte (modèle économique)
export async function fetchEmbedding(text: string, apiKey: string): Promise<number[]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });
  if (!res.ok) throw new Error('Erreur API OpenAI embeddings');
  const data = await res.json();
  return data.data[0].embedding;
}
// Fonctions utilitaires pour le pipeline RAG (chunking, embeddings, similarité, etc.)

export interface Chunk {
  id: string;
  text: string;
  source: string;
}

// Découpage d'un texte en chunks de taille donnée (en caractères, pour simplifier)
export function chunkText(text: string, chunkSize: number, source: string): Chunk[] {
  const chunks: Chunk[] = [];
  let i = 0;
  while (i < text.length) {
    const chunk = text.slice(i, i + chunkSize);
    chunks.push({
      id: `${source}-chunk-${i}`,
      text: chunk,
      source,
    });
    i += chunkSize;
  }
  return chunks;
}

// Lecture d'un fichier texte/markdown
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
