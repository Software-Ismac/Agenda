import { useOpenBaas } from "openbaas-sdk-react";
import React, { createContext, useContext, useState, useEffect } from "react";
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
  createNote: () => Promise<void>;
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
  const [notes, setNotes] = useLocalStorage<Note[] | null>("notes", []);

  const { accessToken, uri } = useOpenBaas();
  const { user, createUser } = useUser();
  const { asPath } = useRouter();

  const updateNote = async (updatedNote: Partial<Note>) => {
    if (asPath == "/tools/notes/edit") {
      const newData = {
        ...note,
        ...updatedNote,
        noteId: note?.noteId,
        type: "update",
        updated: new Date(),
      };

      //@ts-ignore
      setNotes((prev) =>
        prev?.map((x) => (x.noteId == note?.noteId ? newData : x))
      );
      //@ts-ignore
      setNote(newData);
    }
  };

  const updateServer = async () => {
    if (!isOnline || !notes) return;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const requests = notes
        //@ts-ignore
        ?.filter((n) => n?.type === "created" || n?.type === "update")
        //@ts-ignore
        ?.map((n) => {
          if (n?.type === "created") {
            const noteData: Note = {
              userId: n.userId,
              name: n.name,
              noteId: n.noteId,
              note: n.note,
            };
            return fetch(`${uri}/v1/notes`, {
              method: "POST",
              headers,
              body: JSON.stringify(noteData),
            });
          }

          if (n?.type === "update") {
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
        ?.filter(Boolean);
      //@ts-ignore
      await Promise.all(requests);
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  useEffect(() => {
    updateServer();
  }, [asPath, isOnline]);
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
