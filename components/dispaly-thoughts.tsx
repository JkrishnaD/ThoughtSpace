import { useGetThoughts } from "@/hooks/all-thoughts";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
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
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}
export const DisplayThought = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await useGetThoughts();
      setThoughts(data);
      console.log(data);
    };
    fetchData();
  }, [setThoughts]);

  return (
    <div className="text-white grid lg:grid-cols-3 grid-cols-1 font-mono p-3">
      {thoughts.map((thought) => (
        <div key={thought.id}>
          <motion.div
            key={thought.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="m-2">
              <CardHeader className="flex flex-row items-center gap-2">
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
              </CardHeader>
              <CardContent>{thought.content}</CardContent>
            </Card>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
