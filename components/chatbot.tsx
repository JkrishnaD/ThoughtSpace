"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle } from "lucide-react";
import { MdClose } from "react-icons/md";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [typingIndex, setTypingIndex] = useState(-1); // Tracks the typing index for the bot
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start the typing effect when the assistant sends a message
  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].role === "assistant"
    ) {
      setTypingIndex(0); // Start typing effect when the last message is from assistant
    }
  }, [messages]);

  // Typing effect that reveals the assistant's message gradually
  useEffect(() => {
    if (typingIndex === -1) return; // Stop if no typing effect is needed

    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage.role !== "assistant" ||
      typingIndex >= lastMessage.content.length
    )
      return;

    const timer = setInterval(() => {
      setTypingIndex((prevIndex) => {
        if (prevIndex < lastMessage.content.length) {
          return prevIndex + 1;
        }
        clearInterval(timer);
        return prevIndex;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [typingIndex, messages]);

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const response = await axios.post("/api/chatbot", { message: input });
      const botReply =
        response.data.generated_text || "Sorry, I didn't understand that.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
      setTypingIndex(0); // Trigger typing effect when the assistant reply is received
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    }

    setInput(""); // Clear input field
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  // Render each message with typing effect
  const renderMessage = (
    message: { role: string; content: string },
    index: number
  ) => {
    const isUser = message.role === "user";
    const isLastMessage = index === messages.length - 1;
    const displayContent =
      isUser || !isLastMessage
        ? message.content
        : message.content.slice(0, typingIndex);

    return (
      <div
        key={index}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`max-w-[70%] p-3 rounded-lg ${
            isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {displayContent}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isChatOpen ? (
        <Button
          onClick={toggleChat}
          size="icon"
          className="rounded-full h-12 w-12"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      ) : (
        <Card className="sm:w-[400px] max-w-sm ">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Chat</h2>
              <Button onClick={toggleChat} className="p-2">
                <MdClose className="size-5"/>
              </Button>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              {messages.map(renderMessage)}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex items-center space-x-2"
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
