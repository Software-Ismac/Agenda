import withIsmacContext from "@/context/withContext";
import NotesSelectPage from "@/infraestructure/tools/notes/NotesSelectPage";
import { Access } from "openbaas-sdk-react";
import React from "react";
function Notes() {
  return (
    <Access>
      <NotesSelectPage />
    </Access>
  );
}

export default withIsmacContext(Notes);
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
