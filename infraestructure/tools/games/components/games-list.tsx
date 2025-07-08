import React from "react";
import { Button, Card, CardBody, CardFooter, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useGameData } from "../hooks/use-game-data";
import { GameFrame } from "./game-frame";

export const GamesList: React.FC = () => {
  const { games, selectedGame, setSelectedGame } = useGameData();

  if (selectedGame) {
    return (
      <GameFrame game={selectedGame} onClose={() => setSelectedGame(null)} />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Arcade Games</h1>
        <p className="text-foreground-500 max-w-lg mx-auto">
          Disfruta de nuestra colección de juegos clásicos y modernos que puedes
          jugar directamente en tu navegador
        </p>
      </header>

      {/* Featured Games */}

      {/* New Games */}

      {/* All Games */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">All Games</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.name}
              game={game}
              onPlay={() => setSelectedGame(game)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

interface GameCardProps {
  game: {
    name: string;
    src: string;
    img?: string;
    category?: string;
    isNew?: boolean;
    rating?: number;
  };
  onPlay: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <Card className="overflow-hidden" isPressable onPress={onPlay}>
      <CardBody className="p-0 overflow-hidden">
        <div className="relative">
          <img
            src={
              game.img ||
              `https://img.heroui.chat/image/game?w=600&h=400&u=${game.name}`
            }
            alt={game.name}
            className="w-full aspect-video object-cover transition-transform duration-300 hover:scale-105"
          />
          {game.isNew && (
            <Badge color="primary" className="absolute top-2 right-2">
              New
            </Badge>
          )}
          {game.category && (
            <Badge
              color="default"
              variant="flat"
              className="absolute top-2 left-2"
            >
              {game.category}
            </Badge>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{game.name}</h3>
          {game.rating && (
            <div className="flex items-center gap-1 text-warning">
              <Icon icon="lucide:star" className="text-warning" />
              <span className="text-small text-foreground-500">
                {game.rating}
              </span>
            </div>
          )}
        </div>
        <Button color="primary" variant="flat" size="sm" onPress={onPlay}>
          Play Now
        </Button>
      </CardFooter>
    </Card>
  );
};
