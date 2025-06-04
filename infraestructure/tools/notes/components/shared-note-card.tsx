import React from "react";
import { Card, CardBody, CardFooter, Avatar, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

// Mock function to format dates
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const SharedNoteCard = ({ note, onClick }) => {
  const hasUpdates = note?.updated !== undefined;
  const userName = note?.user?.name || note?.user?.email || "Usuario";
  const userInitial = userName.charAt(0).toUpperCase();
  
  return (
    <Card 
      isPressable 
      onPress={onClick}
      className="border border-default-200 hover:border-secondary-200 transition-all duration-200"
      shadow="sm"
    >
      <CardBody className="gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-default-800">{note?.name}</h3>
          <div className="flex items-center gap-1 text-secondary-500">
            <Icon icon="lucide:share-2" className="text-sm" />
            <span className="text-small">Compartida</span>
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-between items-center border-t border-default-100 bg-default-50/50 pt-2 pb-3">
        <div className="flex items-center gap-2">
          <Avatar
            name={userInitial}
            size="sm"
            color="secondary"
            className="text-tiny"
          />
          <div className="flex flex-col">
            <span className="text-small font-medium text-default-700">{userName}</span>
            <span className="text-tiny text-default-500">
              {hasUpdates ? "Actualizado: " : "Creado: "}
              {formatDate(hasUpdates ? note?.updated : note?.created)}
            </span>
          </div>
        </div>
        
        <Tooltip content="Ver agenda">
          <div className="text-secondary-500">
            <Icon icon="lucide:eye" />
          </div>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};