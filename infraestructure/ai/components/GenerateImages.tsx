import useImage from "@/backend/useImage/useImage";
import { base64ToFile } from "@/services/base64ToFile";
import { Button, Card, CardBody, Input, ScrollShadow } from "@heroui/react";
import { Icons, Text } from "cllk";
import { useOpenBaas } from "openbaas-sdk-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function GenerateImages({
  newChat,
  setNewChat,
}: {
  setNewChat: any;
  newChat: boolean;
}) {
  const { uri, accessToken } = useOpenBaas();
  const url = `${uri}/v1/ai/images`;
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const generateImages = async (prompt: any) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al obtener la imagen.");
      }
      const imageData = await response.text();
      setImage(imageData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [prompt, setPrompt] = useState<string>();
  const [save, setSave] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { createImage } = useImage();
  const { handleSubmit, register } = useForm();
  useEffect(() => {
    if (newChat) {
      setPrompt(undefined);
      setSave(false);
      setCompleted(false);
      setNewChat(false);
      setImage(null);
    }
  }, [newChat]);
  return (
    <div>
      <div className="flex flex-col h-[80vh]">
        <main className="flex-1 flex flex-col relative space-y-3">
          <ScrollShadow className="w-full h-[70vh]" size={100}>
            {completed && (
              <>
                <Card className="w-11/12 mx-auto rounded-3xl p-5">
                  <CardBody className="flex-row justify-between">
                    <div>
                      <Text type="BodyMd(Medium)">Generar imagen</Text>
                      <Text type="BodyMd">{prompt}</Text>
                    </div>

                    <div className="flex justify-center">
                      {save ? (
                        <>
                          <Text type="BodyMd">Imagen en galeria</Text>
                        </>
                      ) : (
                        <>
                          <Button
                            onPress={async () => {
                              setSave(true);

                              const file = base64ToFile(image, prompt ?? "");
                              try {
                                await createImage("ai", file);
                              } catch (error) {
                                setSave(false);
                              }
                            }}
                          >
                            Guardar
                          </Button>
                        </>
                      )}
                    </div>
                  </CardBody>
                </Card>
                <div className="w-11/12 mx-auto">
                  <ImageDisplay error={error} image={image} loading={loading} />
                </div>
              </>
            )}
          </ScrollShadow>
          <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-divider pb-14">
            <div className="container mx-auto px-4 py-4">
              <form
                onSubmit={handleSubmit(async (e) => {
                  setPrompt(e.prompt);
                  setCompleted(true);
                  await generateImages(e.prompt);
                })}
                className="w-full max-w-4xl mx-auto flex items-center space-x-3"
              >
                <Input
                  {...register("prompt")}
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  placeholder="Escribe tu mensaje aquí..."
                />
                <Button disabled={completed} type="submit">
                  <Icons icon="IconSend" />
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default GenerateImages;

const ImageDisplay = ({
  image,
  loading,
  error,
}: {
  image: any;
  loading: any;
  error: any;
}) => {
  if (loading) {
    return (
      <div className="bg-zinc-800 animate-pulse aspect-square flex justify-center items-center rounded-xl max-w-[400px] mx-auto">
        <p>Generando Imagen...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {image && (
        <div className="max-w-[400px] mx-auto">
          <img
            className="rounded-3xl"
            src={image}
            alt="Imagen generada"
            style={{ width: "100%", maxWidth: "600px" }}
          />
        </div>
      )}
    </div>
  );
};
