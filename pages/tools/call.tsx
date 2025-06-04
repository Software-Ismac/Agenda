import withIsmacContext from "@/context/withContext";
import CallCenter from "@/infraestructure/home/CallCenter";
import React from "react";

function Call() {
  return <CallCenter />;
}

export default withIsmacContext(Call);
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
