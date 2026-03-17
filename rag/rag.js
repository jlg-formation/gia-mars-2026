// rag.js - Démonstrateur RAG Formation
// Gestion du pipeline RAG en mémoire (JS)

// Variables globales
let openAIKey = '';
let documents = [];
let chunks = [];
let embeddings = [];
let chunkSize = 200;
let embeddingModel = 'text-embedding-3-small';
let chatModel = 'gpt-4-1-mini';

// UI Elements
const keySection = document.getElementById('openai-key-section');
const keyInput = document.getElementById('openai-key');
const validateKeyBtn = document.getElementById('validate-key');
const keyStatus = document.getElementById('key-status');

// Ajout bouton reset
const resetBtn = document.createElement('button');
resetBtn.textContent = 'Réinitialiser le pipeline';
resetBtn.className = 'bg-red-500 text-white px-4 py-2 rounded mt-2';
keySection.appendChild(resetBtn);

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
    if (documents.length > 0) {
      const info = document.createElement('div');
      info.className = 'text-xs text-gray-500 mt-2';
      info.innerHTML = `<strong>Documents chargés:</strong> ${documents.length}`;
      documentsList.appendChild(info);
    }
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
    if (chunks.length > 0) {
      const info = document.createElement('div');
      info.className = 'text-xs text-gray-500 mt-2';
      info.innerHTML = `<strong>Chunks générés:</strong> ${chunks.length} (taille: ${chunkSize} caractères)`;
      chunksVisualization.appendChild(info);
    }
  embeddingSection.classList.remove('hidden');
});

// Etape 4: Embedding (mock, en mémoire)
runEmbeddingBtn.addEventListener('click', async () => {
  embeddings = [];
  embeddingsVisualization.innerHTML = '<em>Génération des embeddings en cours...</em>';
  for (const chunk of chunks) {
    try {
      const vector = await getOpenAIEmbedding(chunk.text, openAIKey);
      embeddings.push({
        chunkIdx: chunk.idx,
        source: chunk.source,
        vector,
        text: chunk.text
      });
      const div = document.createElement('div');
      div.className = 'border rounded p-2 mb-2 bg-yellow-50';
        div.innerHTML = `Embedding ${embeddings.length} (${chunk.source})<br><span class='text-xs text-gray-500'>Modèle: ${embeddingModel}, Dimensions: ${vector.length}</span><br>[${vector.slice(0, 5).join(', ')}...]`;
      embeddingsVisualization.appendChild(div);
    } catch (e) {
      const div = document.createElement('div');
      div.className = 'border rounded p-2 mb-2 bg-red-100';
        div.innerHTML = `<span class='text-red-500'>Erreur embedding chunk ${chunk.idx + 1}: ${e.message}</span><br><span class='text-xs'>Vérifiez votre clé OpenAI ou quota.</span>`;
      embeddingsVisualization.appendChild(div);
    }
  }
    if (embeddings.length > 0) {
      const info = document.createElement('div');
      info.className = 'text-xs text-gray-500 mt-2';
      info.innerHTML = `<strong>Embeddings générés:</strong> ${embeddings.length} (modèle: ${embeddingModel})`;
      embeddingsVisualization.appendChild(info);
    }
  questionSection.classList.remove('hidden');
});

function mockEmbedding(text) {
  // Cette fonction n'est plus utilisée, remplacée par getOpenAIEmbedding
  return [];
}

async function getOpenAIEmbedding(text, apiKey) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        model: embeddingModel,
      input: text
    })
  });
  const data = await response.json();
  if (data && data.data && data.data[0] && data.data[0].embedding) {
    return data.data[0].embedding;
  }
  throw new Error('Erreur lors de la génération des embeddings');
}


// Etape 5: Question et génération de prompt
generatePromptBtn.addEventListener('click', () => {
  const question = userQuestionInput.value.trim();
  if (question.length === 0) return;
  // Recherche des chunks pertinents par similarité
  getOpenAIEmbedding(question, openAIKey).then(questionEmbedding => {
    // Calcul des scores de pertinence (cosine similarity)
    function cosineSimilarity(a, b) {
      let dot = 0, normA = 0, normB = 0;
      for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
      }
      return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }
    embeddings.forEach(e => {
      e.score = cosineSimilarity(questionEmbedding, e.vector);
    });
    // Tri par score décroissant
    const sorted = embeddings.slice().sort((a, b) => b.score - a.score);
      // Option: voir tous les chunks pertinents
      const showAllBtn = document.createElement('button');
      showAllBtn.textContent = 'Voir tous les chunks triés';
      showAllBtn.className = 'bg-gray-300 text-black px-2 py-1 rounded text-xs mb-2';
      promptTemplateDiv.innerHTML = '';
      promptTemplateDiv.appendChild(showAllBtn);
      const relevantChunks = sorted.slice(0, 3);
      const sources = relevantChunks.map(c => c.source);
      const promptTemplate = `Répondez à la question en utilisant les informations suivantes :\n\n{context}\n\nQuestion : {question}`;
      const context = relevantChunks.map(c => c.text).join('\n---\n');
      const promptFinal = promptTemplate.replace('{context}', context).replace('{question}', question);
      promptTemplateDiv.innerHTML += `<strong>Prompt template :</strong><br><pre>${promptTemplate}</pre>`;
      promptFinalDiv.innerHTML = `<strong>Prompt final envoyé au LLM :</strong><br><pre>${promptFinal}</pre><div class='text-xs text-gray-500 mt-2'>Modèle: ${chatModel}</div>`;
      responseSection.classList.remove('hidden');
      // Affichage des scores de pertinence
      sourcesListDiv.innerHTML = `<strong>Sources utilisées (pertinence) :</strong> <ul>${relevantChunks.map(c => `<li>${c.source} <span class='text-xs text-gray-500'>(score: ${c.score.toFixed(3)})</span></li>`).join('')}</ul>`;
      // Appel LLM réel
      callOpenAIChat(promptFinal, sources);
      // Affichage tous les chunks triés
      showAllBtn.addEventListener('click', () => {
        promptTemplateDiv.innerHTML += `<div class='mt-2'><strong>Chunks triés par pertinence :</strong><ul>${sorted.map(c => `<li>${c.source} <span class='text-xs'>(score: ${c.score.toFixed(3)})</span></li>`).join('')}</ul></div>`;
      });
  });
});

function mockLLMResponse(prompt, sources) {
  // Cette fonction n'est plus utilisée
}

async function callOpenAIChat(prompt, sources) {
  llmResponseDiv.innerHTML = '<em>Appel au LLM en cours...</em>';
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIKey}`
      },
      body: JSON.stringify({
          model: chatModel,
        messages: [
          { role: 'system', content: 'Tu es un assistant pédagogique, cite toujours tes sources.' },
          { role: 'user', content: prompt }
        ]
      })
    });
    const data = await response.json();
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      llmResponseDiv.innerHTML = `<em>Réponse générée :</em><br>${data.choices[0].message.content}`;
    } else {
        llmResponseDiv.innerHTML = `<span class="text-red-500">Erreur lors de la génération de la réponse.</span><br><span class='text-xs text-gray-500'>Prompt envoyé:<br><pre>${prompt}</pre></span>`;
    }
  } catch (e) {
      llmResponseDiv.innerHTML = `<span class="text-red-500">Erreur LLM : ${e.message}</span><br><span class='text-xs text-gray-500'>Prompt envoyé:<br><pre>${prompt}</pre></span><br><span class='text-xs'>Vérifiez votre clé OpenAI, quota, ou modèle.</span>`;
  }
  sourcesListDiv.innerHTML = `<strong>Sources utilisées :</strong> <ul>${sources.map(s => `<li>${s}</li>`).join('')}</ul>`;
}
resetBtn.addEventListener('click', () => {
  openAIKey = '';
  keyInput.value = '';
  keyStatus.textContent = '';
  documents = [];
  chunks = [];
  embeddings = [];
  chunkSize = 200;
  documentSection.classList.add('hidden');
  chunkingSection.classList.add('hidden');
  embeddingSection.classList.add('hidden');
  questionSection.classList.add('hidden');
  responseSection.classList.add('hidden');
  documentsList.innerHTML = '';
  chunksVisualization.innerHTML = '';
  embeddingsVisualization.innerHTML = '';
  userQuestionInput.value = '';
  promptTemplateDiv.innerHTML = '';
  promptFinalDiv.innerHTML = '';
  llmResponseDiv.innerHTML = '';
  sourcesListDiv.innerHTML = '';
});

