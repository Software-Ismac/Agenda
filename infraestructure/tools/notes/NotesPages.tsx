import React from "react";
import { locales } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useNote } from "@/backend/useNote/useNote";
import { Icons, QrGenerator, useMessage } from "cllk";
import { useRouter } from "next/router";
import { useOpenBaas } from "openbaas-sdk-react";
import { Button, Card, CardBody, Input } from "@heroui/react";
import ModalTrigger from "@/components/modal/ModalTrigger";
import ButtonCard from "@/components/button/ButtonCard";
import { useNoteEditSync } from "@/backend/Note/infrastructure/useNotes";

const EditorComponent = () => {
  const { note } = useNote();
  const updateNote = useNoteEditSync();
  const { uri, accessToken } = useOpenBaas();
  const editor = useCreateBlockNote({
    initialContent: JSON.parse(note?.note ?? ""),
    uploadFile: async (file) => {
      if (file.type.includes("image")) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(
          `${uri}/v1/images?type=consumer&size=${file.size}`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await response.json();
        return json.uri;
      } else {
        return "";
      }
    },
    dictionary: locales.es,
  });

  editor.onChange((e) => {
    //@ts-ignore
    updateNote({ note: JSON.stringify(e.document) });
  });
  const { push } = useRouter();
  const { messagePromise } = useMessage();
  return (
    <>
      <Card>
        <CardBody className="flex flex-row justify-between">
          <Input
            type="text"
            defaultValue={note?.name || ""}
            onChange={(e) => updateNote({ name: e.target.value })}
          />
          <div></div>
          <ModalTrigger
            title="Actualizar"
            trigger={<Button startContent={<Icons icon="IconSettings" />} />}
          >
            {(modal) => (
              <div className="space-y-3 justify-center items-center w-full my-3">
                <ModalTrigger
                  title="Qr"
                  trigger={<ButtonCard title="Compartir" icon="IconQrcode" />}
                >
                  {(modal) => (
                    <div>
                      <QrGenerator
                        value={JSON.stringify({ noteId: note?.noteId })}
                      />
                    </div>
                  )}
                </ModalTrigger>

                <ModalTrigger
                  title="Eliminar Agenda"
                  trigger={
                    <ButtonCard title="Eliminar Agenda" icon="IconTrash" />
                  }
                >
                  {(modal) => (
                    <div className="flex justify-center">
                      <Button
                        onPress={() => {
                          modal.onClose();

                          messagePromise(
                            async () => {
                              //@ts-ignore
                              await deleteNotes(note?.noteId);
                              push("/tools/notes");
                            },
                            {
                              error: "Error al eliminar la agenda",
                              pending: "Eliminando la agenda...",
                              success: "Agenda eliminada correctamente",
                            }
                          );
                        }}
                        startContent={<Icons icon="IconTrash" />}
                      >
                        Elimnar esta agenda
                      </Button>
                    </div>
                  )}
                </ModalTrigger>
              </div>
            )}
          </ModalTrigger>
        </CardBody>
      </Card>
      <BlockNoteView theme={"light"} editor={editor} />
    </>
  );
};

export default EditorComponent;
