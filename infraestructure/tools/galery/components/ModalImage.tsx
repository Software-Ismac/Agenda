import { useUser } from "@/backend";
import useAlbum from "@/backend/useAlbum/useAlbum";
import ModalTrigger from "@/components/modal/ModalTrigger";
import Text from "@/components/text/Text";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Icons, Img } from "cllk";
import React, { useState } from "react";

function ModalImage({
  setShowModal,
  showModal,
  image,
}: {
  setShowModal: any;
  showModal: any;
  image: any;
}) {
  const { addImageToAlbum } = useAlbum();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const handleTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const deltaY = touchEnd - touchStart;

    if (Math.abs(deltaY) > 50) {
      setShowModal(false);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };
  const { user } = useUser();
  return (
    <>
      <Modal
        style={{
          top: 0,
        }}
        size="full"
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        closeButton={
          <Button
            aria-label="Close modal"
            startContent={<Icons icon="IconX" />}
            onPress={() => {}}
            className="p-1 rounded-full hover:bg-gray-100"
          />
        }
      >
        <ModalContent
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col h-full">
            <ModalHeader className="flex flex-row items-center justify-between gap-1 p-4 border-b">
              <Text type="BodyMd(Medium)">{image.name}</Text>
            </ModalHeader>

            <ModalBody className="flex-1 flex items-center justify-center p-4">
              <div className="max-w-full h-full flex items-center justify-center">
                <Img
                  className="max-w-full h-auto max-h-[60vh] object-contain"
                  link
                  src={image.uri}
                  alt="Modal image"
                />
              </div>
            </ModalBody>

            <ModalFooter className="justify-evenly space-x-3">
              <div
                onClick={() => {
                  //@ts-ignore
                  fetch(image?.uri)
                    .then((response) => response.blob())
                    .then((blob) => {
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      //@ts-ignore
                      a.download = image.name;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      window.URL.revokeObjectURL(url);
                    });
                }}
                className="flex flex-col justify-center items-center"
              >
                <Icons size={40} icon="IconDownload" />
                <Text type="BodyMd(Medium)">Descargar</Text>
              </div>
              <div className="flex flex-col justify-center items-center">
                <Icons size={40} icon="IconEdit" />
                <Text type="BodyMd(Medium)">Editar</Text>
              </div>
              <ModalTrigger
                title="Agregar a album"
                trigger={
                  <div className="flex flex-col justify-center items-center">
                    <Icons size={40} icon="IconPhotoPlus" />
                    <Text type="BodyMd(Medium)">Album</Text>
                  </div>
                }
              >
                {() => {
                  return (
                    <div className="space-y-3">
                      {user?.albums?.map(({ album }) => {
                        return (
                          <Card
                            onPress={() => {
                              //@ts-ignore
                              addImageToAlbum(album.albumId, image.imageId);
                            }}
                            isPressable
                            className="w-11/12 mx-auto"
                          >
                            <CardBody className="flex-row justify-between items-center">
                              <Text type="BodyMd(Medium)">{album.title}</Text>
                              <Icons size={40} icon="IconPhotoPlus" />
                            </CardBody>
                          </Card>
                        );
                      })}
                    </div>
                  );
                }}
              </ModalTrigger>

              <div className="flex flex-col justify-center items-center">
                <Icons size={40} icon="IconTrash" />
                <Text type="BodyMd(Medium)">Eliminar</Text>
              </div>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalImage;
