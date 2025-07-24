import React, { useEffect } from "react";
import Link from "next/link";
import { SocialLogin } from "@capgo/capacitor-social-login";

import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useIsLogin, useOpenBaas } from "openbaas-sdk-react";
import { useMessage } from "cllk";
import { Capacitor } from "@capacitor/core";
import { client } from "@/client";

interface LoginFormProps {
  onSubmit: (email: string) => void;
  onRegister: () => void; // Add this prop
}
const isNative = Capacitor.isNativePlatform();

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  useEffect(() => {
    SocialLogin.initialize({
      google: {
        webClientId: client.google,
        mode: "online",
      },
    });
  }, []);
  const [email, setEmail] = React.useState("");

  const { uri, setAccessToken, setRefreshToken } = useOpenBaas();
  const { setIsLogin } = useIsLogin();
  const { messagePromise } = useMessage();
  const googleLogin = isNative
    ? async () => {
        try {
          const response = await SocialLogin.login({
            provider: "google",
            options: { scopes: ["email", "profile"], forceRefreshToken: true },
          });

          if (response.provider === "google") {
            addToast({
              title: "Iniciando sesión con Google...",
              promise: new Promise(async () => {
                try {
                  const result = response.result as any;
                  const token = result.accessToken?.token;

                  if (!token) {
                    throw new Error("No se encontró el token de acceso.");
                  }

                  // Envías token o code a tu backend
                  const res = await fetch(`${uri}/v1/auth/google`, {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  });

                  if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(
                      `Error en el backend: ${res.status} - ${errorText}`
                    );
                  }

                  const { status, accessToken, refreshToken } =
                    await res.json();

                  if (status) {
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                    setIsLogin(true);
                  } else {
                    throw new Error("Autenticación fallida.");
                  }
                } catch (error) {
                  // Puedes manejar el error aquí o dejar que addToast lo capture
                  console.error("Error en autenticación con Google:", error);
                  throw error; // Re-lanzar para que addToast pueda mostrar error
                }
              }),
            });
          }
        } catch (err) {
          console.error("Error en login nativo", err);
        }
      }
    : useGoogleLogin({
        onSuccess: async (codeResponse) => {
          await messagePromise(
            async () => {
              const res = await fetch(`${uri}/v1/auth/google`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${codeResponse.access_token}`,
                },
              });
              const { status, accessToken, refreshToken } = await res.json();
              if (status) {
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setIsLogin(true);
              }
            },
            {
              error: "Error de código",
              pending: "Verificando código",
              success: "Bienvenido a Ismac Agenda",
            }
          );
        },
        flow: "implicit",
      });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
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
            <img className="w-20 h-20" src="/icons/logo512.webp" alt="" />
          </div>
          <h1 className="text-2xl font-bold text-center">
            Ismac Agenda Digital
          </h1>
          <p className="text-default-500 text-center text-sm">
            Inicia sesión en tu cuenta para continuar
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
            />
            <Button
              type="submit"
              color="primary"
              className="w-full font-medium"
              size="lg"
            >
              Iniciar sesión con correo
            </Button>
          </form>

          <div className="flex items-center gap-4 my-4">
            <Divider className="flex-1" />
            <p className="text-tiny text-default-500">O continuar con</p>
            <Divider className="flex-1" />
          </div>

          <Button
            onPress={() => googleLogin()}
            variant="bordered"
            className="w-full"
            startContent={<Icon icon="logos:google-icon" className="w-5 h-5" />}
          >
            Continuar con Google
          </Button>
        </CardBody>

        <CardFooter className="flex flex-col items-center gap-3 pt-0">
          <p className="text-tiny text-default-500">
            Al iniciar sesión, aceptas nuestros{" "}
            <Link href="/terms" className="text-primary underline text-tiny">
              Términos de servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacy" className="text-primary underline text-tiny">
              Política de privacidad
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
