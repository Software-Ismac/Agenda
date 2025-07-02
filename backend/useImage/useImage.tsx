import { useMessage } from "cllk";
import { useOpenBaas } from "openbaas-sdk-react";
import { useState } from "react";

interface Image {
  imageId: string;
  userId: string;
  size: number;
  name: string;
  type: string;
  uri: string;
}

function useImage() {
  const { messagePromise } = useMessage();
  const { uri, accessToken } = useOpenBaas();
  const [images, setImages] = useState<Image[]>([]);

  const getImages = async () => {
    try {
      const response = await fetch(`${uri}/v1/images`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener imágenes: ${response.statusText}`);
      }
      const data = await response.json();
      setImages(data);
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  };

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
        const newImage = await response.json();
        await getImages(); // Actualizar la galería después de subir
        return newImage;
      },
      {
        error: "Error al subir la imagen",
        pending: "Subiendo imagen a servidor",
        success: "Imagen cargada en galería",
      }
    );
  };

  return { createImage, getImages, images };
}

export default useImage;
