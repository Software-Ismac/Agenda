import withIsmacContext from "@/context/withContext";
import CalendarPages from "@/infraestructure/tools/calendar/CalendarPages";
import { Access } from "openbaas-sdk-react";
import React from "react";

function Calendar() {
  return (
    <Access>
      <CalendarPages />
    </Access>
  );
}

export default withIsmacContext(Calendar);
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
