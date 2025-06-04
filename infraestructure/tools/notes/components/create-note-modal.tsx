import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";

type CreateNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (noteName: string) => void;
};

type FormData = {
  name: string;
};

export const CreateNoteModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateNoteModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    //@ts-ignore
    onCreate(data);
    onClose();
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:book-plus" className="text-primary-500" />
                <span>Crear nueva agenda</span>
              </div>
            </ModalHeader>

            <ModalBody>
              <Input
                {...register("name", {
                  required: "Este campo es obligatorio",
                })}
                label="Nombre de la agenda"
                placeholder="Ej: Notas de trabajo"
                variant="bordered"
                autoFocus
                startContent={
                  <Icon icon="lucide:text" className="text-default-400" />
                }
              />

              <p className="text-small text-default-500">
                Crea una nueva agenda para organizar tus notas personales.
              </p>
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={handleClose}>
                Cancelar
              </Button>
              <Button color="primary" type="submit" isDisabled={!isValid}>
                Crear agenda
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
