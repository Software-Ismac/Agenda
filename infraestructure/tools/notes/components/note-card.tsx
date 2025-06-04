import React from "react";
import { Card, CardBody, CardFooter, Tooltip } from "@heroui/react";
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

export const NoteCard = ({ note, onClick }) => {
  const hasUpdates = note?.updated !== undefined;
  
  return (
    <Card 
      isPressable 
      onPress={onClick}
      className="border border-default-200 hover:border-primary-200 transition-all duration-200"
      shadow="sm"
    >
      <CardBody className="gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-default-800">{note?.name}</h3>
          <Icon icon="lucide:file-text" className="text-primary-400 text-xl" />
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-between items-center border-t border-default-100 bg-default-50/50 pt-2 pb-3">
        <div className="flex items-center gap-1 text-small text-default-500">
          <Icon icon={hasUpdates ? "lucide:refresh-cw" : "lucide:calendar"} className="text-sm" />
          <span>
            {hasUpdates ? "Actualizado: " : "Creado: "}
            {formatDate(hasUpdates ? note?.updated : note?.created)}
          </span>
        </div>
        
        <Tooltip content="Abrir agenda">
          <div className="text-primary-500">
            <Icon icon="lucide:chevron-right" />
          </div>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};