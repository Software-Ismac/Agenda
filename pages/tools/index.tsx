import withIsmacContext from "@/context/withContext";
import ToolsPages from "@/infraestructure/tools/ToolsPages";
import { Access } from "openbaas-sdk-react";
import React from "react";

function Tools() {
  return (
    <Access>
      <ToolsPages />
    </Access>
  );
}

export default withIsmacContext(Tools);
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
