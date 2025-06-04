import useImage from "@/backend/useImage/useImage";
import ModalTrigger from "@/components/modal/ModalTrigger";
import Text from "@/components/text/Text";
import { Button, Card, CardBody, CardHeader, Textarea } from "@heroui/react";
import { FilesImg, useMessage } from "cllk";
import { useOpenBaas } from "openbaas-sdk-react";
import React, { useEffect, useState } from "react";

function AdminPages() {
  const { accessToken, uri } = useOpenBaas();

  const [main, setMain] = useState("");
  const [secondary, setSecondary] = useState<string[]>([""]);
  const [cupones, setCupones] = useState<{ img: string; uri: string }[]>([]);
  const [agenda, setAgenda] = useState<{ img: string; uri: string }[]>([]);
  const get = async () => {
    const res = await (
      await fetch(`${uri}/v1/data`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).json();

    if (res) {
      //@ts-ignore
      const allCupons: { img: string; uri: string; isAgenda?: boolean }[] = [
        ...JSON.parse(res.cupons),
      ];

      setCupones(allCupons?.filter((x) => !x.isAgenda));
      setAgenda(allCupons?.filter((x) => x.isAgenda));

      //@ts-ignore
      const { main, secondary } = JSON.parse(res.ai);
      setMain(main);
      setSecondary(secondary);
    }
  };

  useEffect(() => {
    get();
  }, []);
  const save = async () => {
    fetch(`${uri}/v1/data`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        cupon: JSON.stringify([...cupones, ...agenda]),
        ai: JSON.stringify({ main, secondary }),
      }),
    });
  };

  return (
    <div className="w-11/12 mx-auto space-y-5 py-5">
      <NewDeplot save={save} />
      <GaleriaCupones
        cupones={cupones}
        setCupones={setCupones}
        title="Cupones"
      />
      <GaleriaCupones
        cupones={agenda}
        setCupones={setAgenda}
        title="Agenda"
        isAgenda
      />

      {/* <Cupons cupones={cupones} setCupones={setCupones} />
      <Agenda cupones={agenda} setCupones={setAgenda} /> */}

      <IAPrompt
        main={main}
        secondary={secondary}
        setMain={setMain}
        setSecondary={setSecondary}
      />
    </div>
  );
}

export default AdminPages;
const NewDeplot = ({ save }: { save: any }) => {
  const { messagePromise } = useMessage();
  const deployNewVersion = async () => {
    await save();
    await fetch(
      "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/78e32073-627c-4d4a-a360-37028d601413",
      {
        method: "POST",
      }
    );
  };
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <Text>Desplegar nueva versión</Text>
          <Button
            onPress={() => {
              messagePromise(
                async () => {
                  deployNewVersion();
                },
                {
                  error: "Error al desplegar nueva version",
                  pending: "Desplegando nueva version",
                  success: "Version desplegada correctamente",
                }
              );
            }}
          >
            Desplegar
          </Button>
        </CardHeader>
      </Card>
    </>
  );
};

export const GaleriaCupones = ({
  cupones,
  setCupones,
  title = "Cupones",
  isAgenda = false,
}: {
  //@ts-ignore
  cupones: Cupon[];
  //@ts-ignore
  setCupones: React.Dispatch<React.SetStateAction<Cupon[]>>;
  title?: string;
  isAgenda?: boolean;
}) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const { messagePromise } = useMessage();
  const { uri, accessToken } = useOpenBaas();

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    const reordered = [...cupones];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    setCupones(reordered);
    setDragIndex(null);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    await messagePromise(
      async () => {
        const uploads = await Promise.all(
          Array.from(files).map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(
              `${uri}/v1/images?type=consumer&size=${file.size}`,
              {
                method: "POST",
                body: formData,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            if (!res.ok) {
              throw new Error(`Error al subir imagen: ${res.statusText}`);
            }

            return await res.json();
          })
        );

        const nuevos = uploads
          .filter(Boolean)
          .map((res) => ({ ...res, isAgenda }));

        setCupones((prev) => [...prev, ...nuevos]);
      },
      {
        pending: "Subiendo imagen...",
        success: "Imágenes subidas correctamente",
        error: "Error al subir imágenes",
      }
    );
  };
  const { images } = useImage();
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <Text>{title}</Text>
        <ModalTrigger
          title={`Agregar ${title}`}
          trigger={<Button>Agregar {title}</Button>}
        >
          {(modal) => (
            <FilesImg
              multiple
              onClick={(e) => {
                //@ts-ignore
                handleUpload(e);
                modal.onClose();
              }}
            />
          )}
        </ModalTrigger>
      </CardHeader>

      <div className="p-4 flex flex-wrap gap-2">
        {cupones.length > 0 ? (
          cupones.map((cupon, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className="relative max-w-[150px] w-full cursor-move"
            >
              <img
                src={cupon.uri}
                alt={`Cupón ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => {
                  const filtered = cupones.filter((_, i) => i !== index);
                  setCupones(filtered);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                title="Eliminar cupón"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <Text>No hay cupones disponibles</Text>
        )}
      </div>
    </Card>
  );
};

const IAPrompt = ({
  main,
  setMain,
  secondary,
  setSecondary,
}: {
  secondary: string[];
  setSecondary: any;
  main: any;
  setMain: any;
}) => {
  const handleSecondaryChange = (index: number, value: string) => {
    const updated = [...secondary];
    updated[index] = value;
    setSecondary(updated);
  };

  const addSecondary = () => {
    setSecondary([...secondary, ""]);
  };

  const removeSecondary = (index: number) => {
    const updated = secondary.filter((_, i) => i !== index);
    setSecondary(updated);
  };

  const handleSave = () => {
    const prompts = { main, secondary };
    console.log("Datos guardados:", prompts);
    alert("Prompts guardados correctamente");
  };

  return (
    <Card className="max-w-xl mx-auto p-4 space-y-4">
      <CardHeader>
        <h2 className="text-xl font-semibold">Inteligencia Artificial</h2>
      </CardHeader>
      <CardBody className="space-y-4">
        <Textarea
          placeholder="Prompt principal"
          value={main}
          onChange={(e) => setMain(e.target.value)}
        />

        {secondary.map((text, index) => (
          <div key={index} className="relative">
            <Textarea
              placeholder={`Prompt secundario ${index + 1}`}
              value={text}
              onChange={(e) => handleSecondaryChange(index, e.target.value)}
              className="pr-10"
            />
            {secondary.length > 1 && (
              <button
                type="button"
                onClick={() => removeSecondary(index)}
                className="absolute top-2 right-2 text-red-500 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <Button type="button" variant="bordered" onPress={addSecondary}>
          + Añadir prompt secundario
        </Button>

        <Button onClick={handleSave}>Guardar</Button>
      </CardBody>
    </Card>
  );
};
