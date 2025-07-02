import { useRouter } from 'next/router';
import { saveNoteToLocal } from '@/db/notesStore';
import { Note } from '@/backend/useNote/useNote';

export const useNoteEditSync = () => {
  const router = useRouter();
  const isEditingPage = router.pathname === '/tools/notes/edit';

  const updateNote = (note: Partial<Note>) => {
    if (!note.noteId || !isEditingPage) return;
    saveNoteToLocal(note);
  };

  return updateNote;
};
