
# Démonstrateur RAG en formation

## Rôle
Créer une page web interactive pour illustrer le fonctionnement d’un système RAG (Retrieval-Augmented Generation) à destination de participants en formation.

## Objectif
Permettre à une dizaine de stagiaires de comprendre, manipuler et visualiser les différentes étapes d’un pipeline RAG, de l’ajout de documents à la génération de réponses enrichies par récupération de contexte.

## Contexte
Le livrable est une page HTML unique, utilisant Tailwind via CDN et du JavaScript pur. Aucune base de données vectorielle réelle n’est requise : tout se fait côté client pour la démonstration. L’interface doit guider l’utilisateur à travers toutes les étapes clés d’un RAG.

## Contraintes
- Utiliser uniquement HTML, Tailwind CDN et JavaScript (pas de backend).
- L’intégralité du processus doit être visible et compréhensible par un public non expert.
- La gestion des embeddings et du stockage vectoriel se fait en mémoire (JavaScript).
- L’utilisateur doit pouvoir configurer le chunking (découpage des documents).
- Les prompts envoyés au LLM doivent être affichés.
- Les réponses doivent citer les sources utilisées.

## Format d'entrée et de sortie
**Entrée** :
- Clé OpenAI fournie par l’utilisateur.
- Ajout de documents (texte, markdown, fichiers simples).
- Paramètres de chunking configurables.
- Questions posées par l’utilisateur.

**Sortie** :
- Affichage du prompt généré pour le LLM.
- Réponse du LLM avec citation des sources.
- Visualisation des chunks, embeddings et étapes intermédiaires.

## Exemples
- L’utilisateur ajoute un fichier markdown, configure le chunking (ex : 200 tokens), lance l’embedding, pose une question, voit le prompt généré et la réponse avec les sources citées.
- Un stagiaire modifie les paramètres de chunking et observe l’impact sur la récupération des sources.

## Critères de réussite
- Tous les processus d’un pipeline RAG sont visibles et compréhensibles.
- L’utilisateur peut manipuler chaque étape (clé, documents, chunking, embeddings, question, prompt, réponse).
- Les réponses affichent clairement les sources utilisées.
- L’interface est simple, pédagogique et ne nécessite aucune installation.