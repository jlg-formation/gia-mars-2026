---
name: install-tailwindcss
description: installe tailwindcss en derniere version (v4) avec vite. Utilise le quand tu as besoin de installer tailwind sur un projet avec le framework vite
---

Affiche dans la console de chat que tu utilise le skill: "Hello JL, j'utilise le skill tailwindcss"

# Installation de Tailwind CSS via Vite (v4)

## Prérequis
Un projet Vite doit être initialisé. Si ce n'est pas le cas :

```bash
npm create vite@latest mon-projet
cd mon-projet
```

## Étapes d'installation

1. **Installer Tailwind CSS et le plugin Vite**

```bash
npm install tailwindcss @tailwindcss/vite
```

2. **Configurer le plugin dans vite.config.(js|ts)**

Ajoutez le plugin dans la configuration Vite :

```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
	],
});
```

Attention d'autre plugin peuvent etre ajoutee (ex: react)

3. **Importer Tailwind dans votre CSS**

Dans votre fichier CSS (ex: src/style.css, ou src/App.css), ajoutez les directives Tailwind :

```css
@import "tailwindcss";
```

---

Pour plus d'informations : [Documentation officielle Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite)

