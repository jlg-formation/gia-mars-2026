import { useState } from 'react';
import OpenAIKeyInput from './components/OpenAIKeyInput';
import DocumentUploader from './components/DocumentUploader';
import ChunkingConfig from './components/ChunkingConfig';
import EmbeddingRunner from './components/EmbeddingRunner';
import QuestionInput from './components/QuestionInput';
import RAGPipeline from './components/RAGPipeline';
import './App.css';


function App() {
  // État principal du pipeline RAG
  const [openAIKey, setOpenAIKey] = useState<string | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [chunkSize, setChunkSize] = useState(200);
  const [embeddingsReady, setEmbeddingsReady] = useState(false);
  const [question, setQuestion] = useState('');
  // TODO: Ajouter gestion des chunks, embeddings, réponses, sources, etc.

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Démonstrateur RAG pédagogique</h1>

      {!openAIKey && (
        <OpenAIKeyInput onKeySubmit={setOpenAIKey} />
      )}

      {openAIKey && (
        <>
          <DocumentUploader onDocumentsAdded={files => setDocuments(Array.from(files))} />
          <ChunkingConfig chunkSize={chunkSize} setChunkSize={setChunkSize} />
          <EmbeddingRunner onRun={() => setEmbeddingsReady(true)} disabled={documents.length === 0} />
          <QuestionInput onAsk={setQuestion} disabled={!embeddingsReady} />
          <RAGPipeline
            openAIKey={openAIKey}
            documents={documents}
            chunkSize={chunkSize}
            embeddingsReady={embeddingsReady}
            question={question}
          />
        </>
      )}
    </div>
  );
}

export default App;
