import React from "react";
import { Button, Divider, Tooltip, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";
import { EmptyState } from "./empty-state";
import { NoteCard } from "./note-card";
import { SharedNoteCard } from "./shared-note-card";
import { CreateNoteModal } from "./create-note-modal";
import { QrScannerModal } from "./qr-scanner-modal";
import { NoteViewModal } from "./note-view-modal";
import { useRouter } from "next/router";
import { useMessage } from "cllk";
import { useNotes } from "@/backend";
import { useNote } from "@/backend/useNote/useNote";

export const NotesSelectPages = () => {
  const { shareNote, notes, createNote, notesShares } = useNotes();
  const { getNote } = useNote();
  const { push } = useRouter();
  const { messagePromise } = useMessage();

  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = React.useState(false);
  const [viewingSharedNote, setViewingSharedNote] = React.useState(null);
  //@ts-ignore
  const handleNoteClick = (note) => {
    getNote(note);
    push("/tools/notes/edit");
  };

  const handleQrSuccess = (data: any) => {
    setIsQrModalOpen(false);
    try {
      const { noteId } = JSON.parse(data);

      messagePromise(
        async () => {
          await shareNote(noteId);
        },
        {
          error: "Error al compartir nota",
          pending: "Compartiendo nota...",
          success: "Nota compartida correctamente",
        }
      );
    } catch (error) {
      console.error("Invalid QR data", error);
    }
  };

  const handleViewSharedNote = (note: any) => {
    setViewingSharedNote(note);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Agenda Personal</h1>
        </div>

        <div className="flex gap-2">
          <Tooltip content="Escanear código QR">
            <Button
              variant="flat"
              isIconOnly
              onPress={() => setIsQrModalOpen(true)}
              aria-label="Escanear QR"
            >
              <Icon icon="lucide:qr-code" className="text-xl" />
            </Button>
          </Tooltip>

          <Tooltip content="Crear nueva agenda">
            <Button
              color="primary"
              onPress={() => setIsCreateModalOpen(true)}
              startContent={<Icon icon="lucide:plus" />}
            >
              Nueva Agenda
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Personal notes section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="lucide:notebook" className="text-primary-500" />
          <h2 className="text-lg font-medium">Mis Agendas</h2>
          <Badge color="primary" variant="flat" size="sm">
            {notes?.length || 0}
          </Badge>
        </div>

        {notes && notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                note={note}
                onClick={() => handleNoteClick(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="lucide:book"
            title="No tienes agendas"
            description="Crea tu primera agenda para comenzar a tomar notas"
            actionLabel="Crear Agenda"
            onAction={() => setIsCreateModalOpen(true)}
          />
        )}
      </div>

      {/* Shared notes section */}
      {/* @ts-ignore */}
      {notesShares?.length > 0 && (
        <>
          <Divider className="my-6" />

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="lucide:share-2" className="text-secondary-500" />
              <h2 className="text-lg font-medium">Agendas Compartidas</h2>
              <Badge color="secondary" variant="flat" size="sm">
                {/* @ts-ignore */}
                {notesShares?.length || 0}
              </Badge>
              <Tooltip content="Estas agendas son de solo lectura">
                <span className="text-default-400 cursor-help">
                  <Icon icon="lucide:info" />
                </span>
              </Tooltip>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* @ts-ignore */}
              {notesShares?.map((note, index) => (
                <SharedNoteCard
                  key={index}
                  note={note}
                  onClick={() => handleViewSharedNote(note)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        //@ts-ignore
        onCreate={createNote}
      />

      <QrScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onSuccess={handleQrSuccess}
      />

      {viewingSharedNote && (
        <NoteViewModal
          isOpen={!!viewingSharedNote}
          onClose={() => setViewingSharedNote(null)}
          note={viewingSharedNote}
        />
      )}
    </div>
  );
};
