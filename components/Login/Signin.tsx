import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Link,
} from "@heroui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { Icons, Img, NavLink, Text, useMessage } from "cllk";
import { useIsLogin, useOpenBaas } from "openbaas-sdk-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { CSSTransition } from "react-transition-group";

function Signin({
  magicLinkGenerate,
}: {
  text?: string;
  magicLinkGenerate: (email: string) => any;
  magicLinkConfirm: (email: string, code: string) => any;
  social?: boolean;
}) {
  const { googleLogin } = useGoogle();

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [email, setEmail] = useState();
  const handleOnClick = (res: any) => {
    magicLinkGenerate?.(res);
    setEmail(res);
    setShowTwoFactor(true);
  };

  return (
    <>
      <div className="flex min-h-screen h-full w-full items-center justify-center text-black">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
          <div className="flex flex-col items-center pb-6">
            <div className="w-32 mx-auto">
              <Img src={"/icons/logo192.webp"} />
            </div>
            <p className="text-xl font-medium">Agenda virtual</p>
            <p className="text-small text-default-500">
              Inicia sesión en tu cuenta para continuar
            </p>
          </div>

          {/* <CSSTransition
            in={!showTwoFactor}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit((e) => {
                handleOnClick(e.email);
              })}
            >
              <Input
                {...register("email")}
                isRequired
                label="Correo Electrónico"
                placeholder="Ingresa tu correo"
                type="email"
                variant="bordered"
              />
              <Button type="submit" className="w-full text-white">
                Iniciar sesión
              </Button>
            </form>
          </CSSTransition>

          <CSSTransition
            in={showTwoFactor}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div className="space-y-10">
              <Text type="BodyMd">
                Se ha enviado un código a tu correo electrónico. Por favor, ten
                en cuenta que este tendrá una validez de 5 minutos.
              </Text>

              <TwoFactorAuth
                email={email}
                magicLinkConfirm={magicLinkConfirm}
              />
            </div>
          </CSSTransition> */}
          {/* <div className="flex items-center gap-4 py-2">
            <Divider className="flex-1" />
            <p className="shrink-0 text-tiny text-default-500">O también</p>
            <Divider className="flex-1" />
          </div> */}
          <div className="flex flex-col gap-2">
            <Button
              onPress={() => {
                googleLogin();
              }}
              startContent={<Icons icon="IconBrandGoogle" />}
              variant="bordered"
            >
              Continuar con Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
const TwoFactorAuth = ({
  email,
  magicLinkConfirm,
}: {
  magicLinkConfirm: any;
  email: string | undefined;
}) => {
  const [code, setCode] = useState(Array(6).fill(""));
  useEffect(() => {
    if (!code.includes("")) {
      magicLinkConfirm(email, code);
    }
  }, [code]);
  const handleChange = (value: any, index: any) => {
    if (!/\d/.test(value) && value !== "") return; // Solo permitir dígitos

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Asegurarse de que solo haya un dígito por cajón
    setCode(newCode);

    // Mover el foco al siguiente input si no está vacío
    if (value && index < 5) {
      //@ts-ignore
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e: any, index: any) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Mover el foco al anterior input si está vacío
      //@ts-ignore
      document.getElementById(`digit-${index - 1}`).focus();
    }
  };

  const handlePaste = (e: any) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .replace(/\D/g, "");
    const newCode = Array(6)
      .fill("")
      .map((_, i) => pasteData[i] || "");
    setCode(newCode);
    // Enfocar al último campo lleno
    const lastFilledIndex = newCode.findIndex((digit) => digit === "");
    //@ts-ignore
    document
      .getElementById(`digit-${lastFilledIndex > -1 ? lastFilledIndex : 5}`)
      .focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {code.map((digit, index) => (
        <input
          key={index}
          id={`digit-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-black/50 bg-transparent text-black/80"
        />
      ))}
    </div>
  );
};
function useGoogle() {
  const { uri, setAccessToken, setRefreshToken } = useOpenBaas();
  const { setIsLogin } = useIsLogin();
  const { messagePromise } = useMessage();
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      messagePromise(
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
          error: "Error de codigo",
          pending: "Verificando codigo",
          success: "Bienvenido a Ismac Agenda",
        }
      );
    },
    flow: "implicit",
  });
  return { googleLogin };
}
