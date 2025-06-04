"use client";

import { useCallback, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Inicializar estado con una función para manejar SSR
  const [localState, setLocalState] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Obtener el ítem desde localStorage
      const encryptedItem = window.localStorage.getItem(key);
      if (!encryptedItem) return initialValue;

      // Desencriptar y parsear los datos
      const decryptedItem = CryptoJS.AES.decrypt(encryptedItem, key).toString(
        CryptoJS.enc.Utf8
      );
      return decryptedItem ? JSON.parse(decryptedItem) : initialValue;
    } catch (error) {
      console.warn(`Error reading encrypted localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para manejar la actualización del estado y cifrado
  const handleSetState = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(localState) : value;
        setLocalState(valueToStore);

        if (typeof window !== "undefined") {
          // Cifrar y guardar en localStorage
          const encryptedValue = CryptoJS.AES.encrypt(
            JSON.stringify(valueToStore),
            key
          ).toString();
          window.localStorage.setItem(key, encryptedValue);
        }
      } catch (error) {
        console.warn(
          `Error setting encrypted localStorage key "${key}":`,
          error
        );
      }
    },
    [key, localState]
  );

  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === key && event.newValue) {
        try {
          const decryptedItem = CryptoJS.AES.decrypt(
            event.newValue,
            key
          ).toString(CryptoJS.enc.Utf8);
          setLocalState(JSON.parse(decryptedItem));
        } catch (error) {
          console.warn(`Error handling encrypted storage change:`, error);
        }
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange);
      }
    };
  }, [key]);

  return [localState, handleSetState];
}

export default useLocalStorage;
