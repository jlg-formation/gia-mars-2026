interface Props {
  onRun: () => void;
  disabled?: boolean;
}

export default function EmbeddingRunner({ onRun, disabled }: Props) {
  return (
    <div className="mb-4">
      <button
        className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80 disabled:opacity-50"
        onClick={onRun}
        disabled={disabled}
      >
        Lancer l'embedding
      </button>
    </div>
  );
}
