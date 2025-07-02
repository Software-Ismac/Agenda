import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { saveNoteToLocal, removePendingNote, getPendingNotes } from '@/db/notesStore';
import { noteRepository } from '@/backend/Note/infrastructure/noteRepository';
import { Note } from '@/backend/useNote/useNote';

const SYNC_INTERVAL_MS = 15 * 60 * 1000; // 15 minutos

interface NoteSyncContextType {
  syncPendingNotes: () => Promise<void>;
}

const NoteSyncContext = createContext<NoteSyncContextType | null>(null);

export const NoteSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const mutation = useMutation({
    mutationFn: async (note: Partial<Note>) => {
      return noteRepository.updateNote(note);
    },
    onSuccess: (_data, variables) => {
      if (variables.noteId) {
        removePendingNote(variables.noteId);
      }
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const syncPendingNotes = async () => {
    const notes = await getPendingNotes();
    Object.values(notes).forEach((note) => {
      if (note.noteId) mutation.mutate(note);
    });
  };

  // Configurar sincronización periódica
  useEffect(() => {
    intervalRef.current = setInterval(syncPendingNotes, SYNC_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Sincronizar al cambiar de ruta
  useEffect(() => {
    const handleRouteChange = () => {
      syncPendingNotes();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <NoteSyncContext.Provider value={{ syncPendingNotes }}>
      {children}
    </NoteSyncContext.Provider>
  );
};

export const useNoteSync = () => {
  const context = useContext(NoteSyncContext);
  if (!context) {
    throw new Error('useNoteSync must be used within a NoteSyncProvider');
  }
  return context;
};
