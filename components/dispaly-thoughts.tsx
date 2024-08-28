"use client";

import { useGetThoughts } from "@/hooks/all-thoughts";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";

interface Thought {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export const DisplayThought = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await useGetThoughts();
      setThoughts(data || null);
    };
    fetchData();
  }, [setThoughts]);
  return (
    <div className="h-screen overflow-y-auto p-3">
      <div className="grid text-black lg:grid-cols-3 grid-cols-1 font-mono z-10 gap-4 auto-rows-auto">
        {[...thoughts]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((thought, index) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="m-2 h-auto"
            >
              <Card className="flex flex-col justify-between text-black backdrop-blur-md bg-white border-none shadow-sm overflow-hidden shadow-black">
                <CardHeader className="flex justify-between flex-row">
                  <div className="flex flex-row items-center gap-2">
                    <Avatar className="hover:scale-125 transition">
                      <AvatarImage src={thought.user.image || ""} />
                      <AvatarFallback>
                        {thought.user.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("") || ""}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-bold">{thought.user.name}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  {thought.content}
                </CardContent>
                <CardFooter className="flex-shrink-0">
                  <p className="text-sm text-gray-500">
                    {new Date(thought.createdAt).toLocaleString("en-US", {
                      hour12: true,
                    })}
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );
};
