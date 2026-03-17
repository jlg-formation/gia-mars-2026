import { useRef } from 'react';

interface Props {
  onDocumentsAdded: (docs: FileList) => void;
}

export default function DocumentUploader({ onDocumentsAdded }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Ajouter des documents&nbsp;:</label>
      <input
        ref={fileInput}
        type="file"
        multiple
        accept=".txt,.md,.markdown,.json"
        className="block border rounded px-2 py-1 w-full"
        onChange={e => e.target.files && onDocumentsAdded(e.target.files)}
      />
    </div>
  );
}
