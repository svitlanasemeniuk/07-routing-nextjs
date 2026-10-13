// app/@modal/(.)notes/[id]/NotePreview.client.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '../../../../lib/api/notes';
import Modal from '../../../../components/Modal/Modal';
import Loader from '../../../../components/Loader/Loader';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {isLoading && <Loader />}
      {isError && <p>Помилка завантаження нотатки 🚨</p>}

      {note && (
        <div style={{ padding: '20px' }}>
          <h2>{note.title}</h2>
          <p style={{ marginTop: '10px' }}>{note.content}</p>
        </div>
      )}
    </Modal>
  );
}
