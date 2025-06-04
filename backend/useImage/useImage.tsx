import { useMessage } from "cllk";
import { useOpenBaas } from "openbaas-sdk-react";
import { useUser } from "../useUser/useUser";

function useImage() {
  const { messagePromise } = useMessage();
  const { uri, accessToken } = useOpenBaas();
  const { user, createUser } = useUser();
  const createImage = async (type: "ai" | "consumer", file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return messagePromise(
      async () => {
        const response = await fetch(
          `${uri}/v1/images?type=${type}&size=${file.size}`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error al subir la imagen: ${response.statusText}`);
        }
        return await response.json();
      },
      {
        error: "Error al subir la imagen",
        pending: "Subiendo image a servidor",
        success: "Imagen cargada en galery",
      }
    );
  };
  return { createImage, getImages: createUser, images: user?.galery };
}

export default useImage;
