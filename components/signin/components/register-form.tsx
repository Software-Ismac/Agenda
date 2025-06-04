import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import useRegister2FA from "@/hooks/useRegister";
import { useMagicLink } from "openbaas-sdk-react";

interface RegisterFormProps {
  onSubmit: (email: string) => void;
  onBackToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onBackToLogin,
}) => {
  const [email, setEmail] = React.useState("");
  const { handleGenereteCode } = useMagicLink();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      handleGenereteCode(email);
      onSubmit(email);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-0">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-2">
            <Icon
              icon="lucide:user-plus"
              className="text-primary-500 w-10 h-10"
            />
          </div>
          <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>
          <p className="text-default-500 text-center text-sm">
            Regístrate para acceder a Ismac Agenda Digital
          </p>
        </CardHeader>

        <CardBody className="py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Correo Electrónico"
              placeholder="Ingresa tu correo"
              type="email"
              variant="bordered"
              value={email}
              onValueChange={setEmail}
              isRequired
              startContent={
                <Icon icon="lucide:mail" className="text-default-400 w-5 h-5" />
              }
              classNames={{
                input: "text-sm",
                label: "text-sm",
              }}
              description="Te enviaremos un código de verificación a este correo"
            />

            <Button
              type="submit"
              color="primary"
              className="w-full font-medium"
              size="lg"
            >
              Registrarse
            </Button>
          </form>
        </CardBody>

        <CardFooter className="flex flex-col items-center gap-3 pt-0">
          <p className="text-tiny text-default-500">
            Al registrarte, aceptas nuestros{" "}
            <a href="#" className="text-primary underline text-tiny">
              Términos de servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-primary underline text-tiny">
              Política de privacidad
            </a>
          </p>

          <div className="flex items-center gap-1 w-full justify-center">
            <p className="text-sm text-default-600">¿Ya tienes una cuenta?</p>
            <Button
              variant="light"
              color="primary"
              onPress={onBackToLogin}
              className="font-medium"
              startContent={
                <Icon icon="lucide:arrow-left" className="w-4 h-4" />
              }
            >
              Iniciar sesión
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
