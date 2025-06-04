import Text from "@/components/text/Text";
import { Button } from "@heroui/react";
import React from "react";

function SeletedHeader({
  isSelecting,
  setIsSelecting,
  setSelectedPhotos,
  selectedPhotos,
}: {
  isSelecting: boolean;
  setIsSelecting: any;
  setSelectedPhotos: any;
  selectedPhotos: any[];
}) {
  return (
    <>
      {isSelecting && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-50">
          <Text type="BodyMd(Medium)">
            {selectedPhotos.length} seleccionadas
          </Text>
          <Button
            onPress={() => {
              // Aquí tu lógica para la acción (ej. eliminar)
              setIsSelecting(false);
              setSelectedPhotos([]);
            }}
            color="danger"
          >
            Eliminar
          </Button>
        </div>
      )}
    </>
  );
}

export default SeletedHeader;
