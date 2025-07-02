import { useOpenBaas } from "openbaas-sdk-react";
import React, { createContext, useContext, useEffect } from "react";
import { useUser } from "../useUser/useUser";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useNetwork } from "@/context/NetwoorkProvider";

export interface Note {
  noteId: string;
  userId: string;
  note: string;
  name: string;
  created?: Date;
  updated?: Date;
  type?: "created" | "update";
}

interface NoteContextType {
  note: Note | null;
  updateNote: (updatedNote: Partial<Note>) => Promise<void>;
  getNote: (note: Note) => void;
  getNotes: () => Promise<void>;
  notes: Note[] | undefined;
  deleteNotes: (noteId: string) => Promise<void>;
  shareNote: (noteId: string) => Promise<void>;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOnline } = useNetwork();
  //@ts-ignore
  const [note, setNote] = useLocalStorage<Note | null>("note");
  //@ts-ignore
  const [notes, setNotes] = useLocalStorage<Note[] | null>("notes", []);

  const { accessToken, uri } = useOpenBaas();
  const { user, createUser } = useUser();
  const router = useRouter();

  const saveNoteToLocal = async (noteToSave: Note) => {
    setNotes((prev) => {
      if (!prev) return [noteToSave];
      const exists = prev.find((n) => n.noteId === noteToSave.noteId);
      if (exists) {
        return prev.map((n) =>
          n.noteId === noteToSave.noteId ? noteToSave : n
        );
      }
      return [...prev, noteToSave];
    });
  };

  const removePendingNote = async (noteId: string) => {
    setNotes((prev) => prev?.filter((n) => n.noteId !== noteId) || []);
  };
  console.log(notes);
  const updateNote = async (updatedNote: Partial<Note>) => {
    //@ts-ignore
    const newData: Note = {
      ...note,
      ...updatedNote,
      noteId: note?.noteId || nanoid(),
      type: "update" as const,
      updated: new Date(),
      created: note?.created || new Date(),
      userId: note?.userId || user?.userId || "",
      name: note?.name || "",
    };

    //@ts-ignore
    setNotes((prev) => {
      if (!prev) return [newData]; // Si no hay notas, crear array con la nueva nota

      const exists = prev.find((x) => x.noteId === newData.noteId);

      if (exists) {
        // Si ya existe la nota, actualizarla
        return prev.map((x) => (x.noteId === newData.noteId ? newData : x));
      } else {
        // Si no existe, agregarla al array
        return [...prev, newData];
      }
    });

    //@ts-ignore
    setNote(newData);

    if (router.asPath !== "/tools/notes/edit" && isOnline) {
      await updateServer();
    } else if (!isOnline) {
      await saveNoteToLocal(newData);
    }
  };

  const updateServer = async () => {
    if (!isOnline || !notes || notes.length === 0) {
      console.log("No hay notas para sincronizar o no hay conexión");
      return;
    }
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const requests = notes
        //@ts-ignore
        .filter((n) => n?.type === "created" || n?.type === "update")
        .map((n) => {
          if (n?.type === "created") {
            const noteData: Note = {
              userId: n.userId,
              name: n.name,
              noteId: n.noteId,
              note: n.note,
            };
            console.log("Enviando nota creada al servidor:", noteData);
            return fetch(`${uri}/v1/notes`, {
              method: "POST",
              headers,
              body: JSON.stringify(noteData),
            });
          }

          if (n?.type === "update") {
            console.log("Enviando nota actualizada al servidor:", n);
            return fetch(`${uri}/v1/notes`, {
              method: "PUT",
              headers,
              body: JSON.stringify({
                noteId: n.noteId,
                note: n.note,
                name: n.name,
              }),
            });
          }

          return null;
        })
        .filter(Boolean);

      const results = await Promise.allSettled(requests);

      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error("Error sincronizando nota:", result.reason);
          const failedNote = notes?.[index];
          if (failedNote) saveNoteToLocal(failedNote);
        }
      });

      const successfulNoteIds = results
        .filter((r) => r.status === "fulfilled")
        .map((_, i) => notes?.[i]?.noteId)
        .filter(Boolean);

      if (successfulNoteIds.length > 0) {
        await Promise.all(
          successfulNoteIds.map((id) => removePendingNote(id as string))
        );
      }
    } catch (error) {
      console.error("Error en updateServer:", error);
      throw error;
    }
  };

  // Sincronizar al cambiar de ruta y esperar a que termine antes de navegar
  useEffect(() => {
    const handleRouteChangeStart = async (url: string) => {
      if (isOnline) {
        console.log(
          "Ruta está cambiando a",
          url,
          "- sincronizando notas antes"
        );
        try {
          await updateServer();
          console.log("Sincronización completada antes de cambiar ruta");
        } catch (error) {
          console.error("Error sincronizando antes de cambiar ruta:", error);
        }
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [isOnline, notes, router.events]);

  // Sincronización periódica
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnline) {
        console.log("Sincronización periódica activada");
        updateServer().catch((e) =>
          console.error("Error en sincronización periódica:", e)
        );
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [isOnline, notes]);

  const getNote = (note: Note) => {
    setNote(note);
  };

  const getNotes = async () => {
    if (isOnline) {
      //@ts-ignore
      setNotes(user?.note);
    }
  };

  const deleteNotes = async (noteId: string) => {
    await fetch(`${uri}/v1/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    //@ts-ignore
    await createUser();
  };

  const shareNote = async (noteId: string) => {
    await fetch(`${uri}/v1/notes/${noteId}/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  useEffect(() => {
    getNotes();
  }, [user]);

  return (
    <NoteContext.Provider
      //@ts-ignore
      value={{
        note,
        updateNote,
        getNote,
        getNotes,
        //@ts-ignore
        notes,
        deleteNotes,
        shareNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
};
