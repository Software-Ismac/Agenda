import React, { useState } from "react";
import { LoginForm } from "./components/login-form";
import { TwoFactorAuth } from "./components/two-factor-auth";
import { RegisterForm } from "./components/register-form";
import useRegister2FA from "@/hooks/useRegister";
import { useMagicLink } from "openbaas-sdk-react";

export default function Signin() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false);
  const { handleConfirmationCode: hCC, handleGenerateCode: hGC } =
    useMagicLink();
  const handleGenerateCode = async (email: string) => {
    // Placeholder for the code generation function
    await hGC(email);
    setEmail(email);
    setShowTwoFactor(true);
  };

  const handleConfirmationCode = async (email: string, code: string) => {
    await hCC(email, code);
    // Placeholder for the code confirmation function
    console.log("Confirming code:", code, "for email:", email);
    return true;
  };

  const { generate2FA } = useRegister2FA();
  const handleRegister = async (email: string) => {
    // Placeholder for registration function
    generate2FA(email);
  };

  const messagePromise = async (
    fn: () => Promise<any>,
    messages: { pending: string; success: string; error: string }
  ) => {
    // Placeholder for the message promise function
    try {
      console.log(messages.pending);
      await fn();
      console.log(messages.success);
    } catch (error) {
      console.error(messages.error, error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex w-full justify-center items-center p-4">
        <div className="w-full max-w-md">
          <>
            {!showTwoFactor ? (
              isRegistering ? (
                <RegisterForm
                  onSubmit={(email) => {
                    messagePromise(
                      async () => {
                        await handleRegister(email);
                      },
                      {
                        pending: "Enviando código de verificación...",
                        success: "Código enviado correctamente",
                        error: "Error al enviar el código",
                      }
                    );
                  }}
                  onBackToLogin={() => setIsRegistering(false)}
                />
              ) : (
                <LoginForm
                  onSubmit={(email) => {
                    messagePromise(
                      async () => {
                        await handleGenerateCode(email);
                      },
                      {
                        pending: "Enviando código...",
                        success: "Código enviado correctamente",
                        error: "Error al enviar el código",
                      }
                    );
                  }}
                  onRegister={() => setIsRegistering(true)}
                />
              )
            ) : (
              <TwoFactorAuth
                email={email}
                onConfirm={(code) => {
                  messagePromise(
                    async () => {
                      await handleConfirmationCode(email, code);
                    },
                    {
                      pending: "Verificando código...",
                      success: isRegistering
                        ? "Registro completado con éxito"
                        : "Bienvenido a Ismac Agenda",
                      error: "Error de código",
                    }
                  );
                }}
              />
            )}
          </>
        </div>
      </div>
    </div>
  );
}
