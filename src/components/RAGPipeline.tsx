
import { useState, useEffect } from 'react';
import { chunkText, readFileAsText, fetchEmbedding, cosineSimilarity, buildPrompt, fetchLLMAnswer } from '../lib/rag';
import type { Chunk } from '../lib/rag';

export interface RAGStep {
  label: string;
  description?: string;
  data?: any;
}


interface Props {
  openAIKey: string;
  documents: File[];
  chunkSize: number;
  embeddingsReady: boolean;
  question: string;
}

export default function RAGPipeline({ openAIKey, documents, chunkSize, embeddingsReady, question }: Props) {
  // Chunks, embeddings, prompt, réponse, sources, étapes intermédiaires
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [steps, setSteps] = useState<RAGStep[]>([]);
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  // const [relevantChunks, setRelevantChunks] = useState<Chunk[]>([]); // plus utilisé
  const [loading, setLoading] = useState(false);
  const [embeddings, setEmbeddings] = useState<{ [chunkId: string]: number[] }>({});

  useEffect(() => {
    const runRAG = async () => {
      if (!question || !embeddingsReady || !chunks.length || Object.keys(embeddings).length !== chunks.length) return;
      setLoading(true);
      setSteps(prev => ([
        ...prev.filter(s => s.label !== 'Recherche de contexte' && s.label !== 'Génération de réponse'),
        { label: 'Recherche de contexte', description: 'Recherche des chunks les plus pertinents...' },
      ]));
      // Embedding de la question
      let questionEmbedding: number[] = [];
      try {
        questionEmbedding = await fetchEmbedding(question, openAIKey);
      } catch {
        setLoading(false);
        setSteps(prev => ([...prev, { label: 'Erreur embedding question' }]));
        return;
      }
      // Similarité cosinus sur tous les chunks
      const scored = chunks.map(chunk => ({
        ...chunk,
        score: cosineSimilarity(embeddings[chunk.id] || [], questionEmbedding),
      }));
      scored.sort((a, b) => b.score - a.score);
      const topChunks = scored.slice(0, 4); // On prend les 4 plus pertinents
      // setRelevantChunks(topChunks); // plus utilisé
      setSteps(prev => ([
        ...prev.filter(s => s.label !== 'Recherche de contexte' && s.label !== 'Génération de réponse'),
        { label: 'Recherche de contexte', description: `${topChunks.length} chunk(s) sélectionné(s)` },
      ]));
      // Génération du prompt
      const promptStr = buildPrompt(question, topChunks);
      setPrompt(promptStr);
      setSteps(prev => ([...prev, { label: 'Génération de réponse', description: 'Appel LLM en cours...' }]));
      // Appel LLM
      let llmAnswer = '';
      try {
        llmAnswer = await fetchLLMAnswer(promptStr, openAIKey);
      } catch {
        setLoading(false);
        setSteps(prev => ([...prev, { label: 'Erreur appel LLM' }]));
        return;
      }
      setAnswer(llmAnswer);
      setSources([...new Set(topChunks.map(c => c.source))]);
      setSteps(prev => ([
        ...prev.filter(s => s.label !== 'Génération de réponse'),
        { label: 'Génération de réponse', description: 'Réponse générée' },
      ]));
      setLoading(false);
    };
    runRAG();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, embeddingsReady, chunks, embeddings, openAIKey]);

  // Chunking automatique dès que documents ou chunkSize changent
  useEffect(() => {
    if (!documents.length) {
      setChunks([]);
      setSteps([]);
      setEmbeddings({});
      return;
    }
    setLoading(true);
    Promise.all(documents.map(async (file: File) => {
      const text = await readFileAsText(file);
      return chunkText(text, chunkSize, file.name);
    })).then(allChunks => {
      const flatChunks = allChunks.flat();
      setChunks(flatChunks);
      setSteps([
        { label: 'Ajout des documents', description: `${documents.length} document(s) chargé(s)` },
        { label: 'Chunking', description: `${flatChunks.length} chunk(s) généré(s)` },
      ]);
      setEmbeddings({});
      setLoading(false);
    });
  }, [documents, chunkSize]);

  // Embedding réel des chunks quand embeddingsReady
  useEffect(() => {
    if (!embeddingsReady || !chunks.length) return;
    setLoading(true);
    setSteps(prev => ([
      ...prev.filter(s => s.label !== 'Embeddings'),
      { label: 'Embeddings', description: 'Calcul en cours...' },
    ]));
    (async () => {
      const emb: { [chunkId: string]: number[] } = {};
      for (const chunk of chunks) {
        try {
          emb[chunk.id] = await fetchEmbedding(chunk.text, openAIKey);
        } catch (e) {
          emb[chunk.id] = [];
        }
      }
      setEmbeddings(emb);
      setSteps(prev => ([
        ...prev.filter(s => s.label !== 'Embeddings'),
        { label: 'Embeddings', description: `Embeddings calculés pour ${chunks.length} chunk(s)` },
      ]));
      setLoading(false);
    })();
  }, [embeddingsReady, chunks, openAIKey]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Pipeline RAG&nbsp;: étapes et visualisation</h2>
      <ol className="list-decimal ml-6 space-y-2">
        {steps.map((step, i) => (
          <li key={i}>
            <span className="font-semibold">{step.label}</span>
            {step.description && <span className="ml-2 text-gray-500">{step.description}</span>}
          </li>
        ))}
      </ol>
      {loading && <div className="mt-2 text-blue-500">Découpage des documents...</div>}
      {chunks.length > 0 && (
        <div className="mt-4">
          <div className="font-semibold mb-1">Chunks générés&nbsp;:</div>
          <ul className="text-xs bg-gray-50 rounded p-2 max-h-48 overflow-auto">
            {chunks.map(chunk => (
              <li key={chunk.id} className="mb-1">
                <span className="text-gray-500">[{chunk.source}]</span> {chunk.text.slice(0, 80)}{chunk.text.length > 80 ? '...' : ''}
                {embeddings[chunk.id] && embeddings[chunk.id].length > 0 && (
                  <span className="ml-2 text-green-600">[embedding OK]</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {prompt && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <div className="font-semibold mb-1">Prompt généré&nbsp;:</div>
          <pre className="whitespace-pre-wrap text-sm">{prompt}</pre>
        </div>
      )}
      {answer && (
        <div className="mt-4 p-2 bg-green-50 rounded">
          <div className="font-semibold mb-1">Réponse du LLM&nbsp;:</div>
          <div>{answer}</div>
          {sources.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">Sources&nbsp;: {sources.join(', ')} (chunks les plus pertinents)</div>
          )}
        </div>
      )}
    </div>
  );
}
