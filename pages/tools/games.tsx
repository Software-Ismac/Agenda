import withIsmacContext from "@/context/withContext";
import { GamesList } from "@/infraestructure/tools/games/components/games-list";
import GamesPages from "@/infraestructure/tools/games/GamesPages";
import React from "react";

function Games() {
  return (
    <div>
      <GamesList />
    </div>
  );
}

export default withIsmacContext(Games);
export const getStaticProps = async () => {
  const res = await (
    await fetch(`https://agendaapi.llampukaq.workers.dev/v1/data`)
  ).json();
  return {
    props: {
      cupons: JSON.parse(res.cupons ?? {}),
      calendar: JSON.parse(res.calendar ?? `{}`),
    },
  };
};
