import { Icons, Text } from "cllk";
import React, { useEffect, useState } from "react";
import GenerateImages from "./components/GenerateImages";
import TextGeneration from "./components/TextGeneration";
import Screen from "@/components/layout/Screen";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  useDisclosure,
} from "@heroui/react";

function AiPages() {
  const ModelsAi: {
    title: string;
    placeholder: string;
    type: "text" | "images" | "translate";
  }[] = [
    {
      title: "Generador de texto",
      placeholder: "Preguntame cualquier cosa",
      type: "text",
    },
    {
      title: "Generador de imagenes",
      placeholder: "Que imagen deseas generar",
      type: "images",
    },
  ];

  const [selectedModel, setSelectedModel] = useState(ModelsAi[0]);
  const [newChat, setNewChat] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Navbar maxWidth="xl" isBordered>
        <NavbarBrand>
          <div onClick={onOpen} className="cursor-pointer">
            <Icons className="stroke-[#28303a]" icon="IconMenu2" />
          </div>
          <h1 className="font-bold text-inherit text-xl">Asistente virtual</h1>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Button
            onPress={() => setNewChat((prev) => !prev)}
            color="primary"
            startContent={<Icons icon="IconTextPlus" />}
            variant="flat"
          />
        </NavbarContent>
      </Navbar>
      <div className="h-[80vh]">
        {selectedModel.type === "text" && (
          <TextGeneration key={newChat ? "text-1" : "text-2"} />
        )}
        {selectedModel.type === "images" && (
          <GenerateImages newChat={newChat} setNewChat={setNewChat} />
        )}
      </div>
      {/* DRAWER con el contenido del panel */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="text-center text-[#0095a9]">
                Ismac Ai Models
              </DrawerHeader>
              <DrawerBody>
                <div className="space-y-1 border-b-2 border-white/50 pb-2 my-2">
                  {ModelsAi?.map((model, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedModel(model);
                        onClose(); // <- cierra el Drawer
                      }}
                      className={`rounded-3xl flex justify-start items-center w-full flex-shrink-0 p-2 mx-auto cursor-pointer hover:bg-zinc-700 transition ${
                        model.title == selectedModel.title
                          ? "bg-[#28303a] text-white"
                          : "text-zinc-900 "
                      }`}
                    >
                      <Text className="" type="BodyMd(Medium)">
                        {model.title}
                      </Text>
                    </div>
                  ))}
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AiPages;
