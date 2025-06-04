import { useChat } from "@ai-sdk/react";
import { Button, Input, ScrollShadow, Spinner } from "@heroui/react";
import { Icons } from "cllk";
import { useOpenBaas } from "openbaas-sdk-react";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

function TextGeneration() {
  const { accessToken, uri } = useOpenBaas();

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    api: `${uri}/v1/ai/text`,
    streamProtocol: "text",
    initialMessages: [
      {
        id: new Date().toISOString(),
        role: "system",
        content: "¡Hola! ¿En qué puedo ayudarte hoy?",
      },
    ],
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isGenerating = status === "submitted" || status === "streaming";

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
                        className={`max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-wrap ${
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
                <div ref={bottomRef} />
              </div>
            </div>
          </div>
        </ScrollShadow>

        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-divider z-10 pb-14">
          <div className="container mx-auto px-4 py-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-4xl mx-auto flex items-center space-x-3"
            >
              <Input
                variant="bordered"
                radius="lg"
                size="lg"
                placeholder="Escribe tu mensaje aquí..."
                value={input}
                onChange={handleInputChange}
                disabled={isGenerating}
              />
              <Button
                isLoading={isGenerating}
                type="submit"
                disabled={!input.trim() || isGenerating}
                endContent={<Icons icon="IconSend" />}
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TextGeneration;
