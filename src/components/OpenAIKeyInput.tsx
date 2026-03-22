import { useState } from 'react';

interface Props {
  onKeySubmit: (key: string) => void;
}

export default function OpenAIKeyInput({ onKeySubmit }: Props) {
  const [key, setKey] = useState('');
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Clé OpenAI&nbsp;:</label>
      <input
        type="password"
        className="border rounded px-2 py-1 w-full"
        value={key}
        onChange={e => setKey(e.target.value)}
        placeholder="Entrez votre clé OpenAI..."
      />
        <button
          style={{ background: "var(--accent)" }}
          className="mt-2 px-4 py-1 text-white rounded"
          onClick={() => key && onKeySubmit(key)}
          disabled={!key}
        >
          Valider
        </button>
    </div>
  );
}
