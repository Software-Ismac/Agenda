import withIsmacContext from "@/context/withContext";
import AiPages from "@/infraestructure/ai/AiPages";
import { Access } from "openbaas-sdk-react";
import React from "react";

function AI() {
  return (
    <Access>
      <AiPages />
    </Access>
  );
}

export default withIsmacContext(AI);
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
