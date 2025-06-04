import { Button, Card, CardFooter } from "@heroui/react";
import { Img, Text } from "cllk";
import { useEffect, useState } from "react";

function GamesPages() {
  const [selectedGame, setSelectedGame] = useState<{
    name: string;
    src: string;
  } | null>(null);

  const games: {
    name: string;
    src: string;
    img?: string;
  }[] = [
    {
      name: "2048",
      src: "https://emupedia.net/emupedia-game-2048/",
      img: "https://images.crazygames.com/games/2048/cover_16x9-1707828856995.png?auto=format,compress&q=75&cs=strip",
    },
    {
      name: "Flappy Bird",
      src: "https://emupedia.net/emupedia-game-flappy-bird",
      img: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MZcxSSARUkVfSeAwzQ95kw.png",
    },
    {
      name: "BuscaMinas",
      src: "https://emupedia.net/emupedia-game-minesweeper/",
      img: "https://minesweeper.online/img/homepage/intermediate.png",
    },

    {
      name: "Solitario",
      src: "https://emupedia.net/emupedia-game-solitaire//",
      img: "https://solitarios-online.com/media/solitario_clasico.png",
    },
    {
      name: "Pool Bubbles",
      src: "https://games.gameboss.com/poolbubbles/index.html?lang=en",
      img: "https://images.crazygames.com/games/pool-bubbles/cover-1643211623381.png?auto=format,compress&q=75&cs=strip",
    },
    {
      name: "Mahjong",
      src: "https://games.gameboss.com/mahjongcards/index.html?lang=en",
      img: "https://images.crazygames.com/games/mahjongg-solitaire/cover_16x9-1707829450935.png?auto=format,compress&q=75&cs=strip",
    },
  ];

  useEffect(() => {
    // Agregar un nuevo estado al historial para que el usuario pueda "volver atrás"
    history.pushState(null, "", location.href);

    const handlePopState = () => {
      setSelectedGame(null);
      history.forward(); // Evita que el usuario retroceda en el historial
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedGame]);
  if (selectedGame) {
    return (
      <div className="w-full overflow-x-hidden h-screen fixed top-0 left-0 bg-black z-[1000]">
        <iframe
          src={selectedGame?.src}
          className="w-full h-full border-none"
          title={selectedGame?.name}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 w-11/12 mx-auto py-5">
      <Text className="text-center text-black" type="BodyLg(Medium)">
        Juegos
      </Text>
      <div className="flex flex-wrap gap-5">
        {games.map((game, index) => (
          <Card
            className="w-full max-w-[500px] mx-auto"
            isFooterBlurred
            key={index}
          >
            <div className="w-full aspect-video">
              <Img
                className="w-full aspect-video object-cover bg-center"
                src={game.img}
              ></Img>
            </div>

            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <Button
                onPress={() => setSelectedGame(game)}
                className="text-tiny text-white bg-black/20 w-full"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
              >
                Jugar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default GamesPages;
