// hooks/useNotes.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { noteRepository } from "../application/NoteRepository";
import { useUser } from "@/backend/User";
import { nanoid } from "nanoid";

export const useNotes = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [note, setNote] = useState<Note | null>(null);

  // GET notes
  const {
    data: notes,
    isLoading,
    isError,
    error,
    refetch: getNotes,
  } = useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: () => noteRepository.getNotes(),
  });

  // GET Sync
  const {
    data: notesShares,
    isLoading: isLoadingShares,
    refetch: getNotesShares,
  } = useQuery<Note[], Error>({
    queryKey: ["notesShares"],
    //@ts-ignore
    queryFn: () => noteRepository.getShareNotes(),
  });

  // CREATE
  const createNoteMutation = useMutation({
    mutationFn: (newNote: Partial<Note>) =>
      noteRepository.createNote({
        userId: user?.userId ?? "",
        name: newNote.name ?? "Ismac Page",
        noteId: nanoid(10),
        created: new Date(),
        note: JSON.stringify([
          {
            type: "paragraph",
            content: "Ismac notes",
          },
        ]),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // UPDATE
  const updateNoteMutation = useMutation({
    mutationFn: (updatedNote: Partial<Note>) =>
      noteRepository.updateNote(updatedNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // DELETE
  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => noteRepository.deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // SHARE
  const shareNoteMutation = useMutation({
    mutationFn: (noteId: string) => noteRepository.shareNote(noteId),
    onSuccess: () => {
      // Refetch notesShares after successfully sharing a note
      getNotesShares();
    },
  });

  // Obtener una nota y guardarla en el estado local
  const getNote = (note: Note) => setNote(note);

  return {
    note,
    notes,
    isLoading,
    isError,
    error,
    getNote,
    getNotes, // refetch
    createNote: createNoteMutation.mutateAsync,
    updateNote: updateNoteMutation.mutateAsync,
    deleteNotes: deleteNoteMutation.mutateAsync,
    shareNote: shareNoteMutation.mutateAsync,
    isCreating: createNoteMutation.isPending,
    isUpdating: updateNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
    isSharing: shareNoteMutation.isPending,
    notesShares,
    isLoadingShares,
  };
};

// hooks/useNoteEditSync.ts

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  getPendingNotes,
  removePendingNote,
  saveNoteToLocal,
} from "@/db/notesStore";
const SYNC_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

export const useNoteEditSync = () => {
  const queryClient = useQueryClient();
  const location = useRouter();
  const isEditingPage = location.pathname === "/tools/notes/edit";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const mutation = useMutation({
    mutationFn: async (note: Partial<Note>) => {
      return noteRepository.updateNote(note);
    },
    onSuccess: (_data, variables) => {
      if (variables.noteId) {
        removePendingNote(variables.noteId);
      }
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // Sync all notes from local every 15 minutes
  useEffect(() => {
    if (!isEditingPage) return;

    const syncPendingNotes = async () => {
      const notes = await getPendingNotes();
      Object.values(notes).forEach((note) => {
        if (note.noteId) mutation.mutate(note);
      });
    };

    // Initial sync on entry
    syncPendingNotes();

    // Set interval
    intervalRef.current = setInterval(() => {
      syncPendingNotes();
    }, SYNC_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isEditingPage]);

  const updateNote = (note: Partial<Note>) => {
    if (!note.noteId || !isEditingPage) return;
    saveNoteToLocal(note); // save in IndexedDB
  };

  return updateNote;
};
