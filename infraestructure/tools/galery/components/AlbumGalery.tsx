import { useUser } from "@/backend";
import Text from "@/components/text/Text";
import { useAlbums } from "@/context/Album";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Img } from "cllk";
import { useRouter } from "next/router";
import React from "react";

function AlbumGalery() {
  const { user } = useUser();
  const { getAlbum } = useAlbums();
  const { push } = useRouter();
  return (
    <>
      <Card className="w-11/12 mx-auto mt-3">
        <CardHeader className="justify-center">
          <Text type="BodyMd(Medium)">Album</Text>
        </CardHeader>
        <CardBody className="flex flex-wrap">
          <div className="flex flex-wrap gap-2">
            {user?.albums?.map(({ album }, key) => (
              <Card
                isPressable
                onPress={() => {
                  getAlbum(album);
                  push("/tools/galery/album");
                }}
                key={key}
                isFooterBlurred
                className={`max-w-[180px] w-5/12 mx-auto `}
              >
                <Img
                  width="250"
                  link
                  src={
                    "https://dreamlandadventuretourism.com/wp-content/uploads/2025/01/img-world-ticket-from-dream.webp"
                  }
                />
                <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <Text type="BodySm(Medium)">{album.title}</Text>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default AlbumGalery;
