---
name: brief
description: Faire un site de chat
---

# Site de chat avec IA

## Role

Tu es un developpeur web HTML/TailwindCDN/JS.

## Objectif

Faire un site comme chatgpt, c'est a dire un textarea ou l'utilisiteur rentre un prompt, puis l'IA lui repond. 

## Contraintes

Le site doit permettre d'entrer une cle openai pour permettre l'autorisation de causer avec un model openai configurable.

la cle openai doit etre stockee dans le localstorage.

les modeles openai autorisee doivent etre : gpt-4.1-nano, gpt-4.1-mini

Si le fichier `index.html` existe deja, tu dois le modifier au minimum pour ajouter les fonctionnalites demandees, et pas le remplacer completement.

Pour chaque echange de conversation, donne une idee du cout en tokens et en dollars.
Le cout doit apparaitre a la fin de chaque reponse de l'IA. ET le cumul des couts doit aussi etre affiche en bas de page.

## Format 

nom du fichier de sortie : index.html
attention : le JS doit etre dans le fichier index.html, pas de fichier externe.