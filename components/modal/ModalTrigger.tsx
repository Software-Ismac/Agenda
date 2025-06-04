import { Modal, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import React, { ReactNode } from "react";
import Text from "../text/Text";

function ModalTrigger({
  trigger,
  children,
  title,
}: {
  trigger: ReactNode;
  children: (data: { onClose: () => void }) => ReactNode;
  title: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div>
      {/* @ts-ignore */}
      {React.cloneElement(trigger, { onPress: onOpen, onClick: onOpen })}

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <Text>{title}</Text>
          </ModalHeader>
          {typeof children == "function" ? (
            //@ts-ignore
            <>{children({ onClose })}</>
          ) : (
            <>{children}</>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalTrigger;
