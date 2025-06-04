import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

// Mock BlockNoteView component

// Mock function to create editor

// Mock function to format dates
const formatDate = (date: Date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
//@ts-ignore
export const NoteViewModal = ({ isOpen, onClose, note }) => {
  const editor = useCreateBlockNote({
    initialContent:
      JSON.parse(note?.note) ||
      JSON.stringify([{ type: "paragraph", content: "Sin contenido" }]),
  });

  const userName = note?.user?.name || note?.user?.email || "Usuario";
  const userInitial = userName.charAt(0).toUpperCase();
  const hasUpdates = note?.updated !== undefined;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="lucide:file-text"
                    className="text-secondary-500"
                  />
                  <span>{note?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-tiny text-default-500 flex items-center gap-1">
                    <Icon icon="lucide:share-2" className="text-xs" />
                    Compartida
                  </span>
                </div>
              </div>
            </ModalHeader>

            <Divider />

            <ModalBody>
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={userInitial} color="secondary" />
                <div className="flex flex-col">
                  <span className="font-medium text-default-700">
                    {userName}
                  </span>
                  <span className="text-tiny text-default-500">
                    {hasUpdates ? "Actualizado: " : "Creado: "}
                    {formatDate(hasUpdates ? note?.updated : note?.created)}
                  </span>
                </div>
              </div>

              <BlockNoteView editor={editor} editable={false} theme="light" />
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                variant="flat"
                onPress={onClose}
                fullWidth
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
