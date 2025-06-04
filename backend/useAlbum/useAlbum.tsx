import { useCallback } from "react";
import { useOpenBaas } from "openbaas-sdk-react";
import { nanoid } from "nanoid";
import { useUser } from "../useUser/useUser";
import { useMessage } from "cllk";
export interface Album {
  albumId: String;
  title: String;
  description: String;
  isPublic: Boolean;
  admin: String | undefined;
}
function useAlbum() {
  const { uri, accessToken } = useOpenBaas();
  const { user, createUser } = useUser();
  const { messagePromise } = useMessage();
  const createAlbum = useCallback(
    async (albumData: Partial<Album>) => {
      //@ts-ignore
      const data: Album = {
        albumId: nanoid(),
        isPublic: false,
        admin: user?.userId,
        ...albumData,
      };
      const response = await fetch(`${uri}/v1/album`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error creating album");
      //@ts-ignore
      await addUserToAlbum(data.albumId, user?.userId);
      //@ts-ignore

      return await response.json();
    },
    [accessToken]
  );

  const addUserToAlbum = useCallback(
    async (albumId: string, userId: string) => {
      const response = await fetch(`${uri}/v1/album/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ albumId, userId }),
      });
      if (!response.ok) throw new Error("Error adding user to album");
      return await response.json();
    },
    [accessToken]
  );

  const removeUserFromAlbum = useCallback(
    async (albumId: string, userId: string) => {
      const response = await fetch(`${uri}/v1/album/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ albumId, userId }),
      });
      if (!response.ok) throw new Error("Error removing user from album");
      return await response.json();
    },
    [accessToken]
  );

  const addImageToAlbum = useCallback(
    async (albumId: string, imageId: string) => {
      messagePromise(
        async () => {
          const response = await fetch(`${uri}/v1/album/img`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ albumId, imageId }),
          });
          if (!response.ok) throw new Error("Error adding image to album");
          //@ts-ignore
          await createUser();
          return await response.json();
        },
        {
          error: "Error al agregar imagen",
          pending: "Agregando imagen al album",
          success: "Imagen agregada correctamente",
        }
      );
    },
    [accessToken]
  );

  const removeImageFromAlbum = useCallback(
    async (albumId: string, imageId: string) => {
      const response = await fetch(`${uri}/v1/album/img`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ albumId, imageId }),
      });
      if (!response.ok) throw new Error("Error removing image from album");
      return await response.json();
    },
    [accessToken]
  );

  const updateAlbum = useCallback(
    async (albumId: string, updateData: Partial<Album>) => {
      const response = await fetch(`${uri}/v1/album`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ albumId, ...updateData }),
      });
      if (!response.ok) throw new Error("Error updating album");
      return await response.json();
    },
    [accessToken]
  );

  return {
    createAlbum,
    addUserToAlbum,
    removeUserFromAlbum,
    addImageToAlbum,
    removeImageFromAlbum,
    updateAlbum,
  };
}

export default useAlbum;
