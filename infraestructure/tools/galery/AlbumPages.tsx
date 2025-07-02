import { useUser } from "@/backend";
import useAlbum from "@/backend/useAlbum/useAlbum";
import useImage from "@/backend/useImage/useImage";
import useUploadImages from "@/backend/useUploadImages/useUploadImages";
import ButtonCard from "@/components/button/ButtonCard";
import ModalTrigger from "@/components/modal/ModalTrigger";
import QrGenerator from "@/components/qr/QrGenerator";
import { useAlbums } from "@/context/Album";
import useSSE from "@/hooks/useSse/useSse";
import {
  Button,
  Card,
  CardBody,
  Code,
  Input,
  Link,
  Snippet,
  Textarea,
} from "@heroui/react";
import { FilesImg, Icons, Text, useMessage } from "cllk";
import { useRouter } from "next/router";
import { useOpenBaas } from "openbaas-sdk-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function AlbumPages() {
  const { album, getAlbum } = useAlbums();

  const { user } = useUser();
  const { handleSubmit, register } = useForm();
  const { messagePromise } = useMessage();
  const { createImage, getImages } = useImage();
  const { push } = useRouter();
  useEffect(() => {
    album == undefined && push("/tools/galery");
  }, []);
  return (
    <div>
      <div className="bg-[#98989a] p-5 flex justify-between items-center sticky top-0">
        <div>
          <Text className="text-[#28303a]" type="BodyLg(Medium)">
            Album: {album?.title}
          </Text>
          <Text className="text-[#28303a]" type="BodySm(Medium)">
            {album?.description}
          </Text>
        </div>

        <ModalTrigger
          trigger={
            <Button startContent={<Icons icon="IconPlus" />}>Opciones</Button>
          }
          title="Opciones"
        >
          {() => (
            <div className="space-y-3 my-3">
              {user?.userId == album?.admin && (
                <>
                  <ModalTrigger
                    title="Publicar"
                    trigger={
                      <Card isPressable className="w-11/12 mx-auto">
                        <CardBody className="flex-row justify-between items-center">
                          <Text type="BodyMd(Medium)">Publicar</Text>
                          <Icons size={40} icon="IconBrandPushbullet" />
                        </CardBody>
                      </Card>
                    }
                  >
                    {() => (
                      <div className="p-3">
                        {album?.isPublic ? (
                          <div className="flex flex-col justify-center w-10/12 mx-auto items-center">
                            <Text type="BodyMd(Medium)">
                              Album publicado en
                            </Text>
                            <Link
                              target="_blank"
                              href={`https://ismacagenda.pages.dev/event?id=
                              ${album.albumId}`}
                              color="success"
                            >
                              Link
                            </Link>
                          </div>
                        ) : (
                          // @ts-ignore
                          <Button
                            className="w-full"
                            onPress={async () => {
                              //@ts-ignore
                              getAlbum({ ...album, isPublic: true });
                              //@ts-ignore
                              await updateAlbum(album?.albumId, {
                                isPublic: true,
                              });
                            }}
                            startContent={
                              <Icons icon="IconBrandPushbullet"></Icons>
                            }
                          >
                            Publicar
                          </Button>
                        )}
                      </div>
                    )}
                  </ModalTrigger>

                  <ModalTrigger
                    title="Agregar Equipo"
                    trigger={
                      <Card isPressable className="w-11/12 mx-auto">
                        <CardBody className="flex-row justify-between items-center">
                          <Text type="BodyMd(Medium)">Agregar Equipo</Text>
                          <Icons size={40} icon="IconUserPlus" />
                        </CardBody>
                      </Card>
                    }
                  >
                    {/* @ts-ignore */}
                    <QrGenerator value={album?.albumId} />
                  </ModalTrigger>

                  <Card className="w-11/12 mx-auto">
                    <CardBody className="flex-row justify-between items-center">
                      <Text type="BodyMd(Medium)">Eliminar Equipo</Text>
                      <Icons size={40} icon="IconUserMinus" />
                    </CardBody>
                  </Card>
                  <></>
                  <ModalTrigger
                    title="Publicar"
                    trigger={
                      <Card isPressable className="w-11/12 mx-auto">
                        <CardBody className="flex-row justify-between items-center">
                          <Text type="BodyMd(Medium)">Actualizar info</Text>
                          <Icons size={40} icon="IconBookUpload" />
                        </CardBody>
                      </Card>
                    }
                  >
                    {() => (
                      <>
                        <form
                          onSubmit={handleSubmit((e) => {
                            //@ts-ignore
                            updateAlbum(album?.albumId, e);
                          })}
                          className="space-y-1 flex flex-col justify-center"
                        >
                          <Input
                            //@ts-ignore
                            defaultValue={album?.title ?? ""}
                            label="Nombre"
                            className="text-black"
                            {...register("title")}
                          />
                          <Textarea
                            //@ts-ignore
                            defaultValue={album?.description ?? ""}
                            {...register("description")}
                            label="Descripción"
                            className="text-black"
                          />
                          <Button type="submit">Actualizar</Button>
                        </form>
                      </>
                    )}
                  </ModalTrigger>
                </>
              )}
              <ModalTrigger
                title="Cargar imagen"
                trigger={
                  <ButtonCard title="Cargar imagen" icon="IconFileUpload" />
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
    </div>
  );
}

export default AlbumPages;
