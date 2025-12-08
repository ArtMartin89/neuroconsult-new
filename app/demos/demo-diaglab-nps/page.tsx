"use client";

import { Button } from "@/components/ui/Button";
import { Send, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE = "Здравствуйте! Как я могу помочь вам сегодня?";

// Генерация или получение sessionId из localStorage
const getOrCreateSessionId = (): string => {
  if (typeof window === "undefined") return "";

  const stored = localStorage.getItem("chatSessionId");
  if (stored) return stored;

  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  localStorage.setItem("chatSessionId", newSessionId);
  return newSessionId;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Инициализация sessionId при монтировании компонента
  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading || !sessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    // Добавляем сообщение пользователя
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/demos/demo-diaglab-nps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке сообщения");
      }

      // Логируем ответ для отладки
      console.log("=== API Response Debug ===");
      console.log("Full API response:", JSON.stringify(data, null, 2));
      console.log("API response type:", typeof data);
      console.log("Is array:", Array.isArray(data));
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        console.log("API response keys:", Object.keys(data));
        console.log("Has reply field:", 'reply' in data);
        console.log("Reply value:", data.reply);
      }

      // Извлекаем текст ответа (как в рабочем проекте - проверяем reply первым)
      let responseText = '';

      // Проверяем reply первым (как в рабочем проекте)
      if (data.reply !== undefined && data.reply !== null) {
        responseText = typeof data.reply === 'string' ? data.reply : String(data.reply);
        console.log("Found reply:", responseText);
      } else if (typeof data === 'string') {
        responseText = data;
        console.log("Data is string:", responseText);
      } else if (data && typeof data === 'object') {
        // Проверяем другие возможные поля
        if (data.output) {
          responseText = typeof data.output === 'string' ? data.output : String(data.output);
        } else if (data.response) {
          responseText = typeof data.response === 'string' ? data.response : String(data.response);
        } else if (data.message) {
          responseText = typeof data.message === 'string' ? data.message : String(data.message);
        } else if (data.text) {
          responseText = typeof data.text === 'string' ? data.text : String(data.text);
        } else if (data.answer) {
          responseText = typeof data.answer === 'string' ? data.answer : String(data.answer);
        } else if (Array.isArray(data) && data.length > 0) {
          // Если пришел массив, берем последний элемент
          const lastItem = data[data.length - 1];
          const json = lastItem?.json || lastItem;
          responseText = json?.reply || json?.output || json?.text || json?.message || JSON.stringify(json);
          console.log("Extracted from array:", responseText);
        } else {
          // Пытаемся найти любое строковое значение в объекте
          const stringValues = Object.values(data).filter(v => typeof v === 'string' && v.length > 0);
          if (stringValues.length > 0) {
            responseText = stringValues[0] as string;
            console.log("Found string value:", responseText);
          } else {
            console.warn("Could not extract response text from:", data);
            responseText = JSON.stringify(data);
          }
        }
      } else {
        console.warn("Unexpected data format:", data);
        responseText = 'Извините, не удалось получить ответ.';
      }

      console.log("Final extracted response text:", responseText);
      console.log("=== End Debug ===");

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: typeof responseText === 'string' ? responseText : String(responseText),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: error instanceof Error
          ? `Извините, произошла ошибка: ${error.message}`
          : "Извините, произошла ошибка при обработке вашего сообщения.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/50 bg-accent/10 text-lg font-semibold text-accent shadow-[0_0_30px_rgba(0,123,255,0.35)] group-hover:shadow-[0_0_40px_rgba(0,123,255,0.45)]">
              NΞ
            </span>
            <span className="text-sm font-semibold tracking-[0.35em] text-foreground/80">
              NeuroConsult
            </span>
          </Link>
        </div>
      </header>
      <main className="min-h-screen pb-8">
        <div className="mx-auto max-w-4xl px-6 pt-8 sm:px-10 lg:px-12">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Чат с AI-ассистентом
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Задавайте вопросы, и наш AI-ассистент поможет вам
            </p>
          </div>

          {/* Chat Container */}
          <div className="relative flex h-[calc(100vh-240px)] min-h-[500px] max-h-[800px] flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl sm:h-[calc(100vh-280px)]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-sky-500/20 to-cyan-400/20 border border-sky-400/30 text-white"
                          : "bg-white/5 border border-white/10 text-slate-200"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p
                        className={`mt-1 text-xs ${
                          message.role === "user"
                            ? "text-sky-200/70"
                            : "text-slate-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Печатает...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Введите ваше сообщение..."
                  disabled={isLoading}
                  rows={1}
                  className="form-textarea max-h-32 min-h-[3rem] resize-none py-3 pr-12 sm:pr-3"
                  style={{
                    height: "auto",
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                  }}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-full shrink-0 self-end sm:w-auto"
                  variant="primary"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <span className="sm:hidden">Отправить</span>
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
              <p className="mt-2 text-xs text-slate-500">
                Нажмите Enter для отправки, Shift+Enter для новой строки
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}