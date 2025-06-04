import { useUser } from "@/backend";
import { Album } from "@/backend/useAlbum/useAlbum";
import useLocalStorage from "@/hooks/useLocalStorage";
import useSSE from "@/hooks/useSse/useSse";
import { createProviderFn } from "cllk";
import { useOpenBaas } from "openbaas-sdk-react";
import { useEffect, useState } from "react";

const useAlbu = () => {
  const { user } = useUser();

  const [album, setAlbum] = useLocalStorage<Album | undefined>(
    "album",
    undefined
  );

  const getAlbum = (data: Album) => {
    const find = user?.albums?.find(
      ({ album }) => album.albumId == data.albumId
    );

    //@ts-ignore
    setAlbum(find?.album);
  };
  useEffect(() => {
    if (album != undefined) {
      const find = user?.albums?.find(
        ({ album }) => album.albumId == album.albumId
      );
      //@ts-ignore
      setAlbum(find?.album);
    }
  }, [user]);
  return { getAlbum, album };
};
const [AlbumProvider, useAlbums] = createProviderFn<typeof useAlbu>(useAlbu);
export { AlbumProvider, useAlbums };
