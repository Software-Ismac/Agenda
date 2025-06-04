import useAlbum from "@/backend/useAlbum/useAlbum";
import useImage from "@/backend/useImage/useImage";
import ModalTrigger from "@/components/modal/ModalTrigger";
import QrLector from "@/components/qr/QrLector";
import Text from "@/components/text/Text";
import {
  Button,
  Card,
  CardBody,
  Input,
  ModalFooter,
  Textarea,
} from "@heroui/react";
import { FilesImg, Icons, useMessage } from "cllk";
import React from "react";

function GaleryHeader() {
  const { createImage, getImages } = useImage();
  const { messagePromise } = useMessage();

  return (
    <div className="bg-[#98989a] p-5 flex justify-between items-center sticky top-0">
      <Text className="text-[#28303a]" type="BodyLg(Medium)">
        Galeria
      </Text>
      <ModalTrigger
        trigger={
          <Button startContent={<Icons icon="IconPlus" />}>Opciones</Button>
        }
        title="Opciones"
      >
        {(mdoal1) => (
          <div className="flex flex-col space-y-3 py-5">
            <ModalTrigger
              title="Cargar imagen"
              trigger={
                <Card isPressable className="w-11/12 mx-auto">
                  <CardBody className="flex-row justify-between items-center">
                    <Text type="BodyMd(Medium)">Cargar imagen</Text>
                    <Icons size={40} icon="IconFileUpload" />
                  </CardBody>
                </Card>
              }
            >
              {(modal) => (
                <FilesImg
                  onClick={(event) => {
                    const files = event.target.files;
                    if (!files) return;
                    modal.onClose();
                    messagePromise(
                      async () => {
                        for (const file of files) {
                          await createImage("consumer", file);
                        }
                        //@ts-ignore
                        await getImages();
                      },
                      {
                        error: "Error al subir imagen a servidor",
                        pending: "Subiendo imagen a servidor...",
                        success: "Imagenes subidas a galeria",
                      }
                    );
                  }}
                />
              )}
            </ModalTrigger>
          </div>
        )}
      </ModalTrigger>
    </div>
  );
}

export default GaleryHeader;
