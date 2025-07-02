import useImage from "@/backend/useImage/useImage";
import ModalTrigger from "@/components/modal/ModalTrigger";
import { Button, Card, CardBody, CardFooter, Checkbox } from "@heroui/react";
import { FilesImg, Icons, Img, Text, useMessage } from "cllk";
import { useRef, useState } from "react";
import ModalImage from "./components/ModalImage";
import SeletedHeader from "./components/SeletedHeader";

function GaleryPages() {
  const { images } = useImage();
  const { createImage, getImages } = useImage();
  const { messagePromise } = useMessage();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const pressTimer = useRef(null);
  const startSelection = (imageId: string) => {
    setIsSelecting(true);
    setSelectedPhotos((prev) => [...prev, imageId]);
  };

  const handlePressStart = (imageId: string) => {
    //@ts-ignore
    pressTimer.current = setTimeout(() => startSelection(imageId), 300);
  };

  const handlePressEnd = () => {
    //@ts-ignore
    clearTimeout(pressTimer.current);
  };

  const toggleSelection = (imageId: string) => {
    setSelectedPhotos((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  return (
    <>
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
      <SeletedHeader
        isSelecting={isSelecting}
        selectedPhotos={selectedPhotos}
        setIsSelecting={setIsSelecting}
        setSelectedPhotos={setSelectedPhotos}
      />

      <div className="p-5">
        <div className="flex flex-wrap gap-3 my-4">
          {images?.map((image, key) => {
            // Estado individual para cada modal
            const [showModal, setShowModal] = useState(false);
            return (
              <>
                <ModalImage
                  image={image}
                  key={key}
                  setShowModal={setShowModal}
                  showModal={showModal}
                />
                <Card
                  key={key}
                  isFooterBlurred
                  isPressable
                  //@ts-ignore
                  onPressStart={() => handlePressStart(image.imageId)}
                  onPressEnd={handlePressEnd}
                  onPress={() => {
                    if (isSelecting) {
                      //@ts-ignore
                      toggleSelection(image.imageId);
                    } else {
                      setShowModal(true);
                    }
                  }}
                  className={`max-w-[180px] mx-auto w-5/12 ${
                    //@ts-ignore
                    selectedPhotos.includes(image?.imageId) &&
                    "opacity-90 scale-90"
                  }`}
                >
                  {/* @ts-ignore */}
                  {selectedPhotos.includes(image?.imageId) && (
                    <>
                      <Checkbox
                        className="absolute right-1 top-1"
                        defaultSelected
                        radius="full"
                      />
                    </>
                  )}
                  <Img width="250" link src={image.uri} />
                  <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-0">
                    <Text
                      className="text-center capitalize text-white"
                      type="BodySm(Medium)"
                    >
                      {image.name}
                    </Text>
                  </CardFooter>
                </Card>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default GaleryPages;
