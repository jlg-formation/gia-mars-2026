interface Props {
  chunkSize: number;
  setChunkSize: (size: number) => void;
}

export default function ChunkingConfig({ chunkSize, setChunkSize }: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Taille des chunks (tokens)&nbsp;:</label>
      <input
        type="number"
        min={50}
        max={2000}
        step={10}
        className="border rounded px-2 py-1 w-32"
        value={chunkSize}
        onChange={e => setChunkSize(Number(e.target.value))}
      />
    </div>
  );
}
