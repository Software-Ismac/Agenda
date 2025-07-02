import { useOpenBaas } from "openbaas-sdk-react";
import { Note } from "@/backend/useNote/useNote";

export const noteRepository = {
  updateNote: async (note: Partial<Note>) => {
    const { uri, accessToken } = useOpenBaas();
    
    if (note.type === "created") {
      const response = await fetch(`${uri}/v1/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(note),
      });
      return await response.json();
    }

    if (note.type === "update") {
      const response = await fetch(`${uri}/v1/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          noteId: note.noteId,
          note: note.note,
          name: note.name,
        }),
      });
      return await response.json();
    }

    throw new Error("Invalid note type");
  }
};
