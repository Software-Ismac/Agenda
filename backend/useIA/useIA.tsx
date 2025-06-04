import { useOpenBaas } from "openbaas-sdk-react";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "../useUser/useUser";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useNetwork } from "@/context/NetwoorkProvider";
import { useMessage } from "cllk";

interface Chat {
  chatId: string;
  typeId: "ismac" | "text";
  userId: string;
  messages: string;
  created: Date;
  type?: "created" | "update";
}

interface ChatContextType {
  chat: Chat | null;
  createChat: (type: "ismac" | "text") => void;
  updateChat: (updatedChat: Partial<Chat>) => Promise<void>;
  getChat: (chat: Chat) => void;
  getChats: () => Promise<void>;
  chats: Chat[] | undefined;
  deleteChats: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOnline } = useNetwork();
  //@ts-ignore
  const [chat, setChat] = useLocalStorage<Chat | null>("chat");
  const [chats, setChats] = useLocalStorage<Chat[] | null>("chats", []);

  const { accessToken, uri } = useOpenBaas();
  const { user } = useUser();
  const { asPath } = useRouter();
  const { messagePromise } = useMessage();
  const createChat = (typeId: "ismac" | "text") => {
    const chatData: Chat = {
      chatId: nanoid(10),
      typeId,
      userId: user?.userId ?? "",
      //@ts-ignore
      messages: undefined,
      created: new Date(),
      type: "created",
    };
    setChat(chatData);
    setChats((prev) => [...(prev ?? []), chatData]);
  };

  const updateChat = async (updatedChat: Partial<Chat>) => {
    if (chat?.type == "created") {
      const newData = { ...chat, ...updatedChat };
      //@ts-ignore
      setChats((prev) =>
        prev?.map((x) => (x.chatId === chat?.chatId ? newData : x))
      );
    }
    if (chat?.type == undefined) {
      const newData = { ...chat, ...updatedChat, type: "update" };
      //@ts-ignore
      setChats((prev) =>
        prev?.map((x) => (x.chatId === chat?.chatId ? newData : x))
      );
    }
  };

  const updateServer = async () => {
    if (!isOnline || !chats) return;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const filterChats = chats.filter((x) => x.messages != undefined);
      const requests = filterChats
        ?.filter((c) => c?.type === "created" || c?.type === "update")
        ?.map((c) => {
          if (c?.type === "created") {
            return fetch(`${uri}/v1/chats`, {
              method: "POST",
              headers,
              body: JSON.stringify({
                chatId: c.chatId,
                typeId: c.typeId,
                userId: c.userId,
                messages: c.messages,
                created: c.created,
              }),
            });
          }
          if (c?.type === "update") {
            return fetch(`${uri}/v1/chats/${c.chatId}`, {
              method: "PUT",
              headers,
              body: JSON.stringify({ chatId: c.chatId, messages: c.messages }),
            });
          }
          return null;
        })
        ?.filter(Boolean);
      await Promise.all(requests);
      setChat(null);
      setChats([]);
    } catch (error) {
      console.error("Error updating chats:", error);
    }
  };

  useEffect(() => {
    updateServer();
  }, [asPath, isOnline]);

  const getChat = (chat: Chat) => {
    setChat(chat);
  };
  const deleteChats = async () => {
    messagePromise(
      async () => {
        await fetch(`${uri}/v1/chats`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "DELETE",
        });
        setChats(null);
        setChat(null);
      },
      {
        error: "Error al error chats",
        pending: "Elimando chats...",
        success: "Chats eliminados",
      }
    );
  };

  const getChats = async () => {
    if (isOnline) {
      try {
        const response = await fetch(`${uri}/v1/chats`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();

        if (data.status && data.chats != undefined && data.chats.length != 0) {
          setChats(data.chats);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        //@ts-ignore
        createChat,
        updateChat,
        getChat,
        getChats, //@ts-ignore
        chats,
        deleteChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
