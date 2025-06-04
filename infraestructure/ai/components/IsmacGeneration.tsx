import { useChat } from "@/backend/useIA/useIA";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  ScrollShadow,
} from "@heroui/react";
import { Icons, Text } from "cllk";
import { useOpenBaas } from "openbaas-sdk-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";

function IsmacGeneration({
  newChat,
  setNewChat,
}: {
  setNewChat: any;
  newChat: boolean;
}) {
  const [messages, setMessages] = useState<
    {
      role: string;
      content: string;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const { uri, accessToken } = useOpenBaas();

  const { register, handleSubmit, reset, watch } = useForm<{
    userInput: string;
  }>();
  const userInput = watch("userInput");

  const fetchStream = async ({ userInput }: { userInput: string }) => {
    if (!userInput) return;

    setLoading(true);
    const updatedMessages = [...messages, { role: "user", content: userInput }];
    setMessages(updatedMessages);

    try {
      const response = await fetch(`${uri}/v1/ai/ismac`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.body) throw new Error("Stream no disponible");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantResponse = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        const formattedChunk = chunk.replace(/\n/g, "\n\n");
        assistantResponse += formattedChunk;

        const res = assistantResponse
          .split("data: ")
          .map((item) => {
            try {
              const text = JSON.parse(item).response;
              if (text !== ",") return text;
            } catch (error) {
              return null;
            }
          })
          .filter(Boolean)
          .join("");

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: res,
          };
          return newMessages;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      reset();
    }
  };

  useEffect(() => {
    if (newChat) {
      setMessages([]);
      setNewChat(false);
    }
  }, [newChat]);

  return (
    <div className="flex flex-col h-[80vh]">
      <main className="flex-1 flex flex-col relative">
        <ScrollShadow className="w-full h-[70vh]" size={100}>
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto space-y-4">
                {messages
                  .filter((x) => x.role !== "system")
                  .map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "assistant"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "assistant"
                            ? "bg-content2"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <Markdown className="text-sm">
                          {message.content}
                        </Markdown>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </ScrollShadow>

        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-divider pb-14">
          <div className="container mx-auto px-4 py-4">
            <form
              className="w-full max-w-4xl mx-auto flex items-center space-x-3"
              onSubmit={handleSubmit(fetchStream)}
            >
              <Input
                {...register("userInput")}
                variant="bordered"
                radius="lg"
                size="lg"
                placeholder="Escribe tu mensaje aquí..."
                disabled={loading}
              />
              <Button type="submit" isLoading={loading}>
                <Icons icon="IconSend" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default IsmacGeneration;
