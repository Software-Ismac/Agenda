import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import QrLector from "@/components/qr/QrLector";
import { useNote } from "@/backend/useNote/useNote";
import { useMessage } from "cllk";

// Mock QR scanner component
const QrScanner = ({ onError, onSuccess }) => {
  return (
    <Card className="w-full aspect-square flex items-center justify-center bg-black/5">
      <div className="text-center space-y-4">
        <Icon
          icon="lucide:scan"
          className="text-6xl text-primary-500 mx-auto"
        />
        <QrLector
          onError={onError}
          onSuccess={({ data }) => {
            onSuccess(data);
          }}
        />
      </div>
    </Card>
  );
};

export const QrScannerModal = ({ isOpen, onClose, onSuccess }) => {
  const handleError = (error) => {
    console.error("QR scan error:", error);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg" placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:qr-code" className="text-primary-500" />
                <span>Escanear código QR</span>
              </div>
            </ModalHeader>

            <ModalBody>
              <p className="text-small text-default-600 mb-4">
                Escanea el código QR de una agenda compartida para agregarla a
                tu lista.
              </p>

              <QrScanner onError={handleError} onSuccess={onSuccess} />
            </ModalBody>

            <ModalFooter className="justify-center">
              <Button
                variant="flat"
                color="danger"
                onPress={onClose}
                startContent={<Icon icon="lucide:x" />}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
