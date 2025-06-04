import { environment } from "@/enviroment";

export class NoteRepository {
  private baseUrl = `${environment.openBaas}/v1/notes`;
  private authToken = environment.accessToken;

  private getHeaders(): HeadersInit {
    console.log(this.authToken());
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.authToken()}`,
    };
  }

  async createNote(data: Partial<Note>): Promise<Note> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Create failed: ${error}`);
    }

    return response.json();
  }

  async updateNote(updatedNote: Partial<Note>): Promise<Note> {
    const response = await fetch(`${this.baseUrl}/${updatedNote.noteId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(updatedNote),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Update failed: ${error}`);
    }

    return response.json();
  }

  async getNotes(): Promise<Note[]> {
    const response = await fetch(this.baseUrl, {
      method: "GET",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Fetch notes failed: ${error}`);
    }

    return response.json();
  }

  async deleteNote(noteId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${noteId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Delete failed: ${error}`);
    }
  }

  async shareNote(noteId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${noteId}/share`, {
      method: "POST",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Share failed: ${error}`);
    }
  }
  async getShareNotes(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/share`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Share failed: ${error}`);
    }
    return response.json();
  }
}
export const noteRepository = new NoteRepository();
