---
name: install-tailwindcss
description: installe tailwindcss en derniere version (v4) avec vite. Utilise le quand tu as besoin de installer tailwind sur un projet avec le framework vite
---

Affiche dans la console de chat que tu utilises le skill : "Hello JL, j'utilise le skill tailwindcss"

# Installation de Tailwind CSS avec Vite (v4)

Utilise ce skill pour installer Tailwind CSS dans un projet Vite, sans suivre les méthodes classiques :
- Ne fais pas `npx tailwindcss init` (inutile avec Vite).
- Ne fais pas `npm install -D tailwindcss postcss autoprefixer` (inutile avec Vite).
- Attention pour naviguer utilise toujours de chemin absolu (ex: `/src/style.css`, ou sur windows `C:\truc\machin`), jamais relatifs.
- si tu utilises la commande `cd` pour naviguer, utilise toujours des chemins absolus (ex: `cd /mon/projet` ou sur windows `cd C:\truc\machin`).
- Si une commande cd ou un chemin est nécessaire, tu dois toujours utiliser le chemin absolu du répertoire ou du fichier concerné.

## Prérequis
Le projet Vite doit être créé. Si ce n’est pas le cas :
```bash
npm create vite@latest <mon-projet>
cd <mon-projet>
```

## Étapes d’installation
Si Vite n’est pas installé, lance :
```bash
npm create vite@latest <mon-projet> -- --template react-ts
```
(adapte le template selon tes besoins)

1. **Installer Tailwind CSS et le plugin Vite**

S'assurer d'etre dans le répertoire du projet dans lequel tu veux installer Tailwind CSS, puis lance :
```bash
npm install tailwindcss @tailwindcss/vite
```

2. **Configurer le plugin dans vite.config.(js|ts)**
Ajoute le plugin dans la config Vite :
```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		// autres plugins (ex: react)
	],
});
```

3. **Importer Tailwind dans ton CSS**
Dans ton fichier CSS (ex: src/style.css ou src/App.css), ajoute :
```css
@import "tailwindcss";
```

Ne démarre pas le projet avec Vite ! Tu peux tester avec :
```bash
npm run build
```
Le build doit fonctionner sans erreur et Tailwind CSS doit être intégré.

---

Pour plus d’informations : [Documentation officielle Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite)

