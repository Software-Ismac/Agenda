interface Note {
  noteId: string;
  userId: string;
  note: string;
  name: string;
  created?: Date;
  updated?: Date;
  type?: "created" | "update";
}
