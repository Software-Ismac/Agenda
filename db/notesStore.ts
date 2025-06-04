// db/notesStore.ts
import { get, set } from "idb-keyval";

const LOCAL_NOTES_KEY = "pending-notes";

export const saveNoteToLocal = async (note: Partial<Note>) => {
  const pendingNotes =
    (await get<Record<string, Partial<Note>>>(LOCAL_NOTES_KEY)) || {};
  if (!note.noteId) return;
  pendingNotes[note.noteId] = note;
  await set(LOCAL_NOTES_KEY, pendingNotes);
};

export const getPendingNotes = async (): Promise<
  Record<string, Partial<Note>>
> => {
  return (await get<Record<string, Partial<Note>>>(LOCAL_NOTES_KEY)) || {};
};

export const removePendingNote = async (noteId: string) => {
  const notes = await getPendingNotes();
  delete notes[noteId];
  await set(LOCAL_NOTES_KEY, notes);
};

export const clearAllPendingNotes = async () => {
  await set(LOCAL_NOTES_KEY, {});
};
