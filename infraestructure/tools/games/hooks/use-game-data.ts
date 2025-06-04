import React from "react";

interface Game {
  name: string;
  src: string;
  img?: string;
}

export const useGameData = () => {
  const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);

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

  // Popular games (based on rating)

  // New games

  return {
    games,
    selectedGame,
    setSelectedGame,
  };
};
