import { useCallback } from "react";
import { useOpenBaas } from "openbaas-sdk-react";
import { useRouter } from "next/router";
import { useMessage } from "cllk";

// Reemplaza este import con tu sistema real de mensajes

type MessageParams = {
  type: "success" | "error" | "warning" | "alert";
  description: string;
};

function useRegister2FA() {
  const { message } = useMessage();
  const { uri } = useOpenBaas();
  const router = useRouter();

  // 1. Generar configuración de 2FA y enviar token por correo
  const generate2FA = useCallback(
    async (email: string) => {
      try {
        const res = await fetch(`${uri}/v1/2fa/generate?email=${email}`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        message({
          type: "success",
          description: "Código 2FA enviado por correo electrónico.",
        });

        return true;
      } catch (error: any) {
        message({
          type: "error",
          description: `Error al generar 2FA: ${error.message}`,
        });
        return false;
      }
    },
    [uri, message]
  );

  // 2. Confirmar código 2FA introducido por el usuario
  const confirm2FA = useCallback(
    async (opt: string) => {
      try {
        const res = await fetch(`${uri}/2fa/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ opt, token: router.query.token }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        message({
          type: "success",
          description: "2FA confirmado correctamente.",
        });

        return true;
      } catch (error: any) {
        message({
          type: "error",
          description: `Error al confirmar 2FA: ${error.message}`,
        });
        return false;
      }
    },
    [uri, message]
  );

  // 3. Verificar si el usuario tiene 2FA activo
  const verify2FA = useCallback(
    async (email: string) => {
      try {
        const res = await fetch(`${uri}/v1/2fa/verify?email=${email}`);

        if (!res.ok) {
          return false;
        }

        return true;
      } catch (error: any) {
        message({
          type: "error",
          description: `Usuario no tiene 2FA activo`,
        });
        return false;
      }
    },
    [uri, message]
  );

  // 4. Obtener configuración de 2FA desde el token en la URL (Next.js)
  const get2FA = useCallback(async () => {
    const token = router.query.token as string | undefined;

    if (!token) {
      message({
        type: "error",
        description: "Token no proporcionado en la URL.",
      });
      return null;
    }

    try {
      const res = await fetch(`${uri}/v1/2fa?token=${token}`);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json(); // { secret, otpauth, token }
      return data;
    } catch (error: any) {
      message({
        type: "error",
        description: `Error al obtener configuración 2FA: ${error.message}`,
      });
      return null;
    }
  }, [uri, router.query.token, message]);

  return {
    generate2FA,
    confirm2FA,
    verify2FA,
    get2FA,
  };
}

export default useRegister2FA;
