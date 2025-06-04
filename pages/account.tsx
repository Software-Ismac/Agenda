import withIsmacContext from "@/context/withContext";
import AccountsPages from "@/infraestructure/account/AccountsPages";
import { Access } from "openbaas-sdk-react";
import React from "react";

function Account() {
  return (
    <Access>
      <AccountsPages />
    </Access>
  );
}

export default withIsmacContext(Account);
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
