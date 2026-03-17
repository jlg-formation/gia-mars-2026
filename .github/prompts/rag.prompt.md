
# Démonstrateur RAG en formation

## Rôle
Tu es un assistant de code expert en React, TypeScript, Vite et Tailwind CSS (installé via Vite).
Tu maîtrises les processus du RAG (Retrieval-Augmented Generation) et tu es capable de les expliquer de manière pédagogique à des stagiaires.

## Objectif

Créer une application web moderne et pédagogique pour démontrer les étapes d’un pipeline RAG, de l’ajout de documents à la génération de réponses enrichies par récupération de contexte.


## Contexte

Nous sommes dans un contexte de formation, où l’objectif est de rendre les concepts de RAG accessibles à des stagiaires sans expertise technique approfondie. Le démonstrateur doit être interactif et permettre aux utilisateurs de comprendre chaque étape du processus, depuis l’ajout de documents jusqu’à la génération de réponses enrichies.

## User flow

1. L’utilisateur arrive sur la page d’accueil de l’application React.
2. Il est invité à entrer sa clé OpenAI pour activer les fonctionnalités du RAG.
3. L’utilisateur peut ajouter des documents (texte, markdown, fichiers simples) qui seront utilisés pour la récupération de contexte.
4. Il configure les paramètres de chunking (découpage des documents en morceaux plus petits).
5. L’utilisateur lance le processus d’embedding pour créer des représentations vectorielles de ses documents (embeddings et stockage vectoriel gérés en mémoire avec TypeScript).
6. Il pose une question à laquelle il souhaite obtenir une réponse enrichie par récupération de contexte.
7. L’application génère un prompt pour le LLM en intégrant les chunks pertinents récupérés, et affiche ce prompt à l’utilisateur (template et prompt final).
8. Le LLM génère une réponse en utilisant les informations récupérées, et cette réponse est affichée à l’utilisateur avec les sources citées et les scores de pertinence.

## Contraintes
- Utiliser Vite, React, TypeScript et Tailwind CSS (installé via Vite, pas de CDN).
- Pas de backend : tout se fait côté client.
- L’intégralité du processus doit être visible et compréhensible par un public non expert.
- La gestion des embeddings et du stockage vectoriel se fait en mémoire (TypeScript).
- L’utilisateur doit pouvoir configurer le chunking (découpage des documents).
- Les prompts envoyés au LLM doivent être affichés.
- Les réponses doivent citer les sources utilisées.
- Les appels au LLM ne doivent pas être simulés, mais réels (via l’API OpenAI), en utilisant la clé fournie par l’utilisateur.
- Les appels au moteur d'embedding doivent également être réels, en utilisant la même clé OpenAI.
- Si les fichiers de sortie existent déjà, travailler en mode modification minimum, en ajoutant les fonctionnalités manquantes ou contraintes non satisfaites pour compléter le démonstrateur.
- Les modèles de chat doivent être des modèles économiques (gpt4.1 ou gpt5.1 mini), et les modèles d'embeddings doivent être économiques (ex : text-embedding-3-small).
- Ne cree pas de workspace ou de projet Vite, mais ajoute les fichiers nécessaires dans le répertoire `/rag-vite` pour compléter le démonstrateur.
- Installer vite via `npm create vite@latest rag-vite -- --template react-ts`.
- Installe tailwindcss via Vite comme indiqué dans le skill. (/.github/skills/tailwindcss-vite.md)
- Installe un gitignore adapté pour une application React + TypeScript + Tailwind CSS, en excluant les fichiers de configuration, les fichiers de code source, et les fichiers de style, mais en incluant les fichiers de build et les dépendances.

## Format d'entrée et de sortie
**Entrée** :
- Clé OpenAI fournie par l’utilisateur.
- Ajout de documents (texte, markdown, fichiers simples).
- Paramètres de chunking configurables.
- Questions posées par l’utilisateur.

**Sortie** :
- Affichage du prompt généré par le LLM.
- Réponse du LLM avec citation des sources.
- Visualisation des chunks, embeddings et étapes intermédiaires.

Les livrables informatiques sont livrés dans le répertoire `/rag-vite` :
- Application React dans `/rag-vite` (structure Vite standard).
- Les composants TypeScript pour gérer les fonctionnalités du RAG (ajout de documents, chunking, embeddings, génération de prompts, affichage des réponses).
- Un fichier `.gitignore` adapté pour une application React + TypeScript + Tailwind CSS.
## Exemples
- L’utilisateur ajoute un fichier markdown, configure le chunking (ex : 200 tokens), lance l’embedding, pose une question, voit le prompt généré et la réponse avec les sources citées.
- Un stagiaire modifie les paramètres de chunking et observe l’impact sur la récupération des sources.

## Critères de réussite
- Tous les processus d’un pipeline RAG sont visibles et compréhensibles.
- L’utilisateur peut manipuler chaque étape (clé, documents, chunking, embeddings, question, prompt, réponse).
- Les réponses affichent clairement les sources utilisées.
- L’interface est simple, pédagogique et ne nécessite aucune installation.