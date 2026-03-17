// rag.js - Démonstrateur RAG Formation
// Gestion du pipeline RAG en mémoire (JS)

// Variables globales
let openAIKey = '';
let documents = [];
let chunks = [];
let embeddings = [];
let chunkSize = 200;

// UI Elements
const keySection = document.getElementById('openai-key-section');
const keyInput = document.getElementById('openai-key');
const validateKeyBtn = document.getElementById('validate-key');
const keyStatus = document.getElementById('key-status');

const documentSection = document.getElementById('document-section');
const documentInput = document.getElementById('document-input');
const fileUpload = document.getElementById('file-upload');
const addDocumentBtn = document.getElementById('add-document');
const documentsList = document.getElementById('documents-list');

const chunkingSection = document.getElementById('chunking-section');
const chunkSizeInput = document.getElementById('chunk-size');
const applyChunkingBtn = document.getElementById('apply-chunking');
const chunksVisualization = document.getElementById('chunks-visualization');

const embeddingSection = document.getElementById('embedding-section');
const runEmbeddingBtn = document.getElementById('run-embedding');
const embeddingsVisualization = document.getElementById('embeddings-visualization');

const questionSection = document.getElementById('question-section');
const userQuestionInput = document.getElementById('user-question');
const generatePromptBtn = document.getElementById('generate-prompt');
const promptTemplateDiv = document.getElementById('prompt-template');
const promptFinalDiv = document.getElementById('prompt-final');

const responseSection = document.getElementById('response-section');
const llmResponseDiv = document.getElementById('llm-response');
const sourcesListDiv = document.getElementById('sources-list');

// Etape 1: Validation de la clé OpenAI
validateKeyBtn.addEventListener('click', () => {
  openAIKey = keyInput.value.trim();
  if (openAIKey.length > 0) {
    keyStatus.textContent = 'Clé OpenAI enregistrée.';
    keyStatus.classList.remove('text-red-500');
    keyStatus.classList.add('text-green-500');
    documentSection.classList.remove('hidden');
  } else {
    keyStatus.textContent = 'Veuillez entrer une clé OpenAI valide.';
    keyStatus.classList.remove('text-green-500');
    keyStatus.classList.add('text-red-500');
    documentSection.classList.add('hidden');
  }
});

// Etape 2: Ajout de documents
addDocumentBtn.addEventListener('click', () => {
  const text = documentInput.value.trim();
  if (text.length > 0) {
    documents.push({ type: 'text', content: text });
    updateDocumentsList();
    chunkingSection.classList.remove('hidden');
  }
});

fileUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      documents.push({ type: 'file', name: file.name, content: evt.target.result });
      updateDocumentsList();
      chunkingSection.classList.remove('hidden');
    };
    reader.readAsText(file);
  }
});

function updateDocumentsList() {
  documentsList.innerHTML = '';
  documents.forEach((doc, idx) => {
    const div = document.createElement('div');
    div.className = 'border rounded p-2 mb-2 bg-gray-50';
    div.textContent = doc.type === 'file' ? `Fichier: ${doc.name}` : `Texte: ${doc.content.substring(0, 40)}...`;
    documentsList.appendChild(div);
  });
}

// Etape 3: Chunking
applyChunkingBtn.addEventListener('click', () => {
  chunkSize = parseInt(chunkSizeInput.value, 10);
  chunks = [];
  documents.forEach(doc => {
    const content = doc.content;
    for (let i = 0; i < content.length; i += chunkSize) {
      chunks.push({
        source: doc.type === 'file' ? doc.name : 'Texte',
        text: content.substring(i, i + chunkSize),
        idx: i / chunkSize
      });
    }
  });
  chunksVisualization.innerHTML = '';
  chunks.forEach((chunk, idx) => {
    const div = document.createElement('div');
    div.className = 'border rounded p-2 mb-2 bg-purple-50';
    div.textContent = `Chunk ${idx + 1} (${chunk.source}): ${chunk.text.substring(0, 40)}...`;
    chunksVisualization.appendChild(div);
  });
  embeddingSection.classList.remove('hidden');
});

// Etape 4: Embedding (mock, en mémoire)
runEmbeddingBtn.addEventListener('click', () => {
  embeddings = chunks.map(chunk => ({
    chunkIdx: chunk.idx,
    source: chunk.source,
    vector: mockEmbedding(chunk.text),
    text: chunk.text
  }));
  embeddingsVisualization.innerHTML = '';
  embeddings.forEach((emb, idx) => {
    const div = document.createElement('div');
    div.className = 'border rounded p-2 mb-2 bg-yellow-50';
    div.textContent = `Embedding ${idx + 1} (${emb.source}): [${emb.vector.slice(0, 5).join(', ')}...]`;
    embeddingsVisualization.appendChild(div);
  });
  questionSection.classList.remove('hidden');
});

function mockEmbedding(text) {
  // Génère un vecteur simple basé sur le code des caractères
  return Array.from(text.substring(0, 20)).map(c => c.charCodeAt(0) % 100);
}

// Etape 5: Question et génération de prompt
generatePromptBtn.addEventListener('click', () => {
  const question = userQuestionInput.value.trim();
  if (question.length === 0) return;
  // Recherche des chunks pertinents (mock: tous)
  const relevantChunks = embeddings.slice(0, 3); // mock: prend les 3 premiers
  const sources = relevantChunks.map(c => c.source);
  const promptTemplate = `Répondez à la question en utilisant les informations suivantes :\n\n{context}\n\nQuestion : {question}`;
  const context = relevantChunks.map(c => c.text).join('\n---\n');
  const promptFinal = promptTemplate.replace('{context}', context).replace('{question}', question);
  promptTemplateDiv.innerHTML = `<strong>Prompt template :</strong><br><pre>${promptTemplate}</pre>`;
  promptFinalDiv.innerHTML = `<strong>Prompt final envoyé au LLM :</strong><br><pre>${promptFinal}</pre>`;
  responseSection.classList.remove('hidden');
  // Appel LLM (mock)
  mockLLMResponse(promptFinal, sources);
});

function mockLLMResponse(prompt, sources) {
  // Simule une réponse LLM
  llmResponseDiv.innerHTML = `<em>Réponse générée (mock):</em> <br>"Voici une réponse basée sur le contexte fourni."`;
  sourcesListDiv.innerHTML = `<strong>Sources utilisées :</strong> <ul>${sources.map(s => `<li>${s}</li>`).join('')}</ul>`;
}
