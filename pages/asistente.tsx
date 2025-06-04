import withIsmacContext from "@/context/withContext";
import IsmacGeneration from "@/infraestructure/ai/components/IsmacGeneration";
import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { Icons, Text } from "cllk";
import React, { useState } from "react";

function Asistente() {
  const [newChat, setNewChat] = useState(false);
  return (
    <>
      <Navbar maxWidth="xl" isBordered>
        <NavbarBrand>
          <h1 className="font-bold text-inherit text-xl">Asistente virtual</h1>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Button
            onPress={() => {
              setNewChat((prev) => !prev);
            }}
            color="primary"
            startContent={<Icons icon="IconTextPlus" />}
            variant="flat"
          ></Button>
        </NavbarContent>
      </Navbar>

      <div>
        <IsmacGeneration newChat={newChat} setNewChat={setNewChat} />
      </div>
    </>
  );
}

export default withIsmacContext(Asistente);
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
