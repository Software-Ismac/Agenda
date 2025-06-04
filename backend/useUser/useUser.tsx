import useLocalStorage from "@/hooks/useLocalStorage";
import { useIsLogin, useOpenBaas } from "openbaas-sdk-react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { Note } from "../useNote/useNote";
import { Album } from "../useAlbum/useAlbum";

interface User {
  userId?: string;
  email?: string;
  name?: string;
  avatar?: string;
  phone?: string;
  albums?: { album: Album }[];
  share?: { note: Note }[];
  galery?: {
    imageId: String;
    userId: String;
    size: Number;
    name: String;
    type: String;
    uri: String;
  }[];
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  createUser: (userData: Omit<User, "userId">) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { isLogin } = useIsLogin();
  const { uri, accessToken } = useOpenBaas();
  const [user, setUser] = useLocalStorage<User | null>("userinfo", null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${uri}/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
      });
      console.log(response);

      if (!response.ok) throw new Error("Error creating user");
      const data = await response.json();

      setUser(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = useCallback(async (userData: Partial<User>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${uri}/v1/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Error updating user");
      const data = await response.json();

      setUser({ ...user, ...data });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    isLogin && accessToken && createUser();
  }, [isLogin, accessToken]);
  return (
    <UserContext.Provider
      value={{ user, loading, error, createUser, updateUser }}
    >
      <div className={`${isLogin && "pb-20"}`}>{children}</div>
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
