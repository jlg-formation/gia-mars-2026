---
name: projet-embedding
description: Faire un site qui fait une demo sur les embeddings de texte
---

# Générer un site de démonstration d'embeddings de texte

## Rôle
Développeur web front-end.

## Objectif
Créer un site web interactif qui permet de générer des embeddings à partir de textes saisis par l'utilisateur, d'afficher ces embeddings, et de calculer la similarité cosinus entre les deux derniers textes saisis. L'utilisateur peut choisir d'utiliser LMStudio ou OpenAI pour générer les embeddings.

## Contexte
Le site doit proposer une interface simple et moderne : un champ de saisie de texte, un bouton pour générer l'embedding, une liste affichant les textes et leurs embeddings, et une section affichant la similarité cosinus entre les deux derniers textes. Les embeddings pourront être générés soit via OpenAI (avec une clé API fournie par l'utilisateur et stockée dans le local storage du navigateur), soit via LMStudio (l'utilisateur pourra configurer l'URL du serveur LMStudio). Le site doit être entièrement fonctionnel côté client, sans nécessiter de backend.

## Contraintes
- Si le fichier de sortie existe déjà, il doit être modifié au minimum pour ajouter les nouvelles fonctionnalités, sans réécrire tout le contenu.
- Interface responsive et agréable (utiliser HTML/CSS natif, pas de framework requis).
- L'utilisateur peut choisir entre OpenAI (clé API stockée dans le local storage) ou LMStudio (URL du serveur stockée dans le local storage) pour générer les embeddings.
- Affichage de la similarité cosinus uniquement si au moins deux textes ont été saisis.
- Tout doit fonctionner côté client, sans backend.
- Code clair et bien structuré.
- Afficher la longueur de chaque embedding à côté de celui-ci.

## Format d'entrée et de sortie
- fichier `index-embedding.html` : contient le code HTML, CSS et JavaScript nécessaire pour le site.

## Exemples
- L'utilisateur saisit « Bonjour », clique sur « Générer l'embedding » : le site affiche le texte et son embedding.
- L'utilisateur saisit « Salut », clique sur « Générer l'embedding » : le site affiche les deux textes, leurs embeddings, et la similarité cosinus entre eux.

## Critères de réussite
- L'utilisateur peut saisir plusieurs textes et voir pour chacun son embedding.
- L'utilisateur peut choisir entre OpenAI et LMStudio pour générer les embeddings.
- La similarité cosinus s'affiche correctement dès qu'il y a au moins deux textes.
- L'interface est claire, fonctionnelle et agréable.
- Le code est lisible, bien commenté et respecte les contraintes.