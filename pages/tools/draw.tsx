import withIsmacContext from "@/context/withContext";
import { Tldraw } from "tldraw";

function Draw() {
  return (
    <div
      className="flex flex-col"
      style={{ position: "fixed", inset: 0, zIndex: 10 }}
    >
      <Tldraw options={{ maxPages: 1 }}></Tldraw>
      <div className="h-14 w-full"></div>
    </div>
  );
}

export default withIsmacContext(Draw);
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
