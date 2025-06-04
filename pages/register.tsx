import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Image, InputOtp, Spacer } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import useRegister2FA from "@/hooks/useRegister";
import { QrGenerator } from "cllk";

const QRVerification = () => {
  const { confirm2FA, get2FA } = useRegister2FA();
  const [data, setData] = useState();
  useEffect(() => {
    const fetch2FA = async () => {
      const data = await get2FA();

      setData(data?.otpauth);
      if (!data) {
        console.error("Error fetching 2FA configuration");
      }
    };
    fetch2FA();
  }, [get2FA]);
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);

  const handleVerify = () => {
    if (otp.length === 6 && !isVerified) {
      confirm2FA(otp);
      setIsLoading(true);
      // Simulate verification process
      setTimeout(() => {
        setIsLoading(false);
        setIsVerified(true);

        // We no longer reset automatically after success
      }, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <Card className="p-8 shadow-md border border-content3 overflow-visible">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Icon
              icon="lucide:shield-check"
              className="text-primary-500"
              width={24}
            />
            <h1 className="text-2xl font-semibold text-foreground">
              Verificación de seguridad
            </h1>
          </div>

          <Spacer y={1} />
          <div className="w-full h-px bg-content3" />
          <Spacer y={3} />

          <div className="text-center w-full p-3 bg-content2 rounded-lg mb-4">
            <p className="text-small text-foreground-600">
              <Icon icon="lucide:info" className="inline mr-1" width={16} />
              Escanee el código QR con su aplicación de autenticación y luego
              ingrese el código generado
            </p>
          </div>

          <motion.div
            className="bg-gradient-to-br from-content2 to-content3 rounded-xl w-full max-w-[260px] flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <QrGenerator value={data ?? ""}></QrGenerator>
          </motion.div>

          <Spacer y={6} />

          {isVerified ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <Alert
                color="success"
                variant="bordered"
                startContent={<Icon icon="lucide:check-circle" width={24} />}
                className="mb-4"
              >
                <p className="font-medium">Verificación completada con éxito</p>
              </Alert>
            </motion.div>
          ) : (
            <div className="text-center w-full">
              <p className="text-foreground-600 mb-3 font-medium">
                Ingrese el código de verificación de 6 dígitos
              </p>
              <div className="flex justify-center">
                <InputOtp
                  length={6}
                  value={otp}
                  onValueChange={setOtp}
                  onComplete={handleVerify}
                  size="lg"
                  radius="md"
                  classNames={{
                    input: "border-2 shadow-sm bg-content1",
                  }}
                />
              </div>
            </div>
          )}

          <Spacer y={4} />

          <Button
            color={isVerified ? "success" : "primary"}
            size="lg"
            className="w-full font-medium"
            onPress={handleVerify}
            isLoading={isLoading}
            isDisabled={otp.length !== 6 || isVerified}
            startContent={
              !isLoading &&
              isVerified && <Icon icon="lucide:check" width={20} />
            }
            variant={isVerified ? "flat" : "solid"}
            radius="md"
          >
            {isVerified ? "Verificado" : "Confirmar"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
export default QRVerification;
