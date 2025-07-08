import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, CardHeader, InputOtp } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import useRegister2FA from "@/hooks/useRegister";
import { useMagicLink } from "openbaas-sdk-react";

interface TwoFactorAuthProps {
  email: string;
  onConfirm: (code: string) => void;
}

export const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  email,
  onConfirm,
}) => {
  const { handleGenereteCode } = useMagicLink();

  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!code.includes("")) {
      onConfirm(code.join(""));
    }
  }, [code, onConfirm]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Move focus to next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .replace(/\D/g, "");

    const newCode = Array(6).fill("");
    for (let i = 0; i < pasteData.length; i++) {
      if (i < 6) newCode[i] = pasteData[i];
    }

    setCode(newCode);

    // Focus on the appropriate input after paste
    const lastIndex = Math.min(pasteData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
            <Icon icon="lucide:shield" className="text-primary-500 w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold">Verificación de código</h2>
          <p className="text-default-500 text-center text-sm">
            Se ha enviado un código a{" "}
            <span className="font-medium">{email}</span>
          </p>
          <p className="text-default-500 text-center text-xs">
            Revisa tu bandeja de entrada y sigue las instrucciones para
            completar el proceso. Si no encuentras el correo, recuerda revisar
            también la carpeta de correo no deseado o spam.
          </p>
        </CardHeader>

        <CardBody className="flex flex-col items-center gap-6">
          <div className="flex justify-center gap-2 w-full">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  //@ts-ignore
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={code[index]}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-xl font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-default-200 bg-content1"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
          </div>

          <div className="text-center space-y-4 w-full">
            <p className="text-sm text-default-500">
              El código expirará en{" "}
              <span className="font-medium text-danger">
                {formatTime(timeLeft)}
              </span>
            </p>

            <Button
              isDisabled={timeLeft > 0} // Solo habilitado si el tiempo es 0
              onPress={() => {
                handleGenereteCode(email)
                  .then(() => {
                    console.log("Código reenviado correctamente");
                  })
                  //@ts-ignore
                  .catch((error) => {
                    console.error("Error al reenviar el código:", error);
                  });
              }}
              variant="flat"
              color="primary"
              className="w-full"
              startContent={
                <Icon icon="lucide:refresh-cw" className="w-4 h-4" />
              }
            >
              Reenviar código
            </Button>

            <Button
              variant="light"
              className="w-full mt-2"
              startContent={
                <Icon icon="lucide:arrow-left" className="w-4 h-4" />
              }
              onPress={() => window.location.reload()}
            >
              Volver al inicio de sesión
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
