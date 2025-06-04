import { useUser } from "@/backend";
import ButtonCard from "@/components/button/ButtonCard";
import ModalTrigger from "@/components/modal/ModalTrigger";
import {
  Settings,
  SettingsContainer,
  SettingsItem,
} from "@/components/settings/Settings";
import { Button, ModalFooter } from "@heroui/react";
import { DataStyle, Icons, Img, Input, NavLink, Text, useMessage } from "cllk";
import { useLogoutAllSesion, useOpenBaas } from "openbaas-sdk-react";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
interface data {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  icon?: string;
}
function AccountsPages() {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    phone: user?.phone ?? "",
    name: user?.name ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const { messagePromise } = useMessage();
  const { handleSubmit, register } = useForm();
  const { logoutAllSessions } = useLogoutAllSesion();
  const { logout } = useOpenBaas();
  return (
    <div className="p-5 space-y-3">
      <Text className="text-[#28303a]" type="BodyLg(Medium)">
        Configuración
      </Text>
      <Settings
        name={user?.name ?? "Usuario"}
        description="Bienvenido a Instituo Tecnologico ISMAC"
        img={
          <Img
            link
            width="60"
            className="rounded-full w-full h-full object-cover"
            src={`https://robohash.org/${user?.userId}`}
          />
        }
      >
        <SettingsContainer title="Informacion Personal">
          <SettingsItem
            icon="IconUser"
            title="Informacion Personal"
            description="Nombre, apellido e información general"
          >
            <div className="space-y-3">
              <DataStyle title="Email">{user?.email}</DataStyle>
              <DataStyle title="Celular">{user?.phone}</DataStyle>
              <DataStyle title="Nombre">{user?.name}</DataStyle>
              <ModalTrigger
                trigger={
                  <ButtonCard
                    title="Actualizar"
                    icon="IconUserCheck"
                  ></ButtonCard>
                }
                title="Actualizar Datos"
              >
                {(modal) => (
                  <div className="px-5">
                    <form
                      className="my-3"
                      onSubmit={handleSubmit((e) => {
                        messagePromise(
                          async () => {
                            modal.onClose();
                            await updateUser(e);
                          },
                          {
                            error: "Error al actualizar datos",
                            pending: "Actualizando datos...",
                            success: "Datos Actualizados",
                          }
                        );
                      })}
                    >
                      <Input
                        register={register}
                        name="phone"
                        type="number"
                        label="Celular"
                        defaultValue={formData.phone}
                        onChange={handleChange}
                      />
                      <Input
                        register={register}
                        label="Nombre"
                        name="name"
                        defaultValue={formData.name}
                        onChange={handleChange}
                      />
                      <ModalFooter className="justify-around">
                        <Button variant="bordered" onPress={modal.onClose}>
                          Cancelar
                        </Button>
                        <Button
                          variant="shadow"
                          type="submit"
                          startContent={<Icons icon="IconCloudUpload" />}
                        >
                          Actualizar
                        </Button>
                      </ModalFooter>
                    </form>
                  </div>
                )}
              </ModalTrigger>
            </div>
          </SettingsItem>
          <SettingsItem
            icon="IconLogout"
            title="Logout"
            description="Salir de la cuenta y cambiar credenciales"
          >
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Cerrar esta sesión</p>
                <p className="text-xs text-muted-foreground">
                  Cierra la sesión actual solo en este dispositivo.
                </p>
                <Button onPress={logout} variant="bordered">
                  Cerrar sesión actual
                </Button>
              </div>

              <div className="space-y-1 pt-4 border-t">
                <p className="text-sm font-medium">Cerrar todas las sesiones</p>
                <p className="text-xs text-muted-foreground">
                  Revoca el secreto del cliente y cierra todas las sesiones en
                  todos los dispositivos.
                </p>
                <Button
                  color="danger"
                  onPress={logoutAllSessions}
                  variant="shadow"
                >
                  Cerrar todas las sesiones
                </Button>
              </div>
            </div>
          </SettingsItem>
        </SettingsContainer>
      </Settings>
    </div>
  );
}

export default AccountsPages;
