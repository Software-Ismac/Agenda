import withIsmacContext from "@/context/withContext";
import GaleryPages from "@/infraestructure/tools/galery/GaleryPages";
import { Access } from "openbaas-sdk-react";

function Galery() {
  return (
    <Access>
      <GaleryPages />
    </Access>
  );
}

export default withIsmacContext(Galery);
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
