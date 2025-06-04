import withIsmacContext from "@/context/withContext";
import AgendaPages from "@/infraestructure/tools/agenda/AgendaPages";
import { Access } from "openbaas-sdk-react";
import React from "react";

function Agenda() {
  return (
    <Access>
      <AgendaPages />
    </Access>
  );
}

export default withIsmacContext(Agenda);
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
