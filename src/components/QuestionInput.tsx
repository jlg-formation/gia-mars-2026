import { useState } from 'react';

interface Props {
  onAsk: (question: string) => void;
  disabled?: boolean;
}

export default function QuestionInput({ onAsk, disabled }: Props) {
  const [question, setQuestion] = useState('');
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Posez votre question&nbsp;:</label>
      <input
        type="text"
        className="border rounded px-2 py-1 w-full"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ex: Qu'est-ce que le RAG ?"
        disabled={disabled}
      />
      <button
        className="mt-2 px-4 py-1 bg-accent text-white rounded hover:bg-accent/80 disabled:opacity-50"
        onClick={() => question && onAsk(question)}
        disabled={!question || disabled}
      >
        Envoyer
      </button>
    </div>
  );
}
