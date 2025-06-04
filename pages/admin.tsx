import withIsmacContext from "@/context/withContext";
import AccessAdmin from "@/infraestructure/admin/AccessAdmin";
import AdminPages from "@/infraestructure/admin/AdminPages";
import { Access } from "openbaas-sdk-react";
import React from "react";

function Admin() {
  return (
    <Access>
      <AccessAdmin>
        <AdminPages />
      </AccessAdmin>
    </Access>
  );
}

export default withIsmacContext(Admin);
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
