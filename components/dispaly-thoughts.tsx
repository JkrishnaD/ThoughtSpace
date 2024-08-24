"use client";
import { useGetThoughts } from "@/hooks/all-thoughts";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { deleteThought } from "@/actions/deleteThought";
import { useCurrentUser } from "@/hooks/current-user";

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
  const user = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await useGetThoughts();
      setThoughts(data || null);
    };
    fetchData();
  }, [setThoughts]);
  console.log(user?.id)
  const handleDelete = async (thoughtId: string) => {
    await deleteThought(thoughtId);
    setThoughts(thoughts.filter((thought) => thought.id !== thoughtId));
  };

  return (
    <div className="grid text-black lg:grid-cols-3 grid-cols-1 font-mono z-10 p-3">
      {thoughts.map((thought) => (
        <div key={thought.id}>
          <motion.div
            key={thought.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-black m-2 backdrop-blur-md bg-white border-none">
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
                {user?.id !== thought.user.id && (
                  <MdDelete
                    onClick={() => handleDelete(thought.id)}
                    color="red"
                    className="hover:cursor-pointer"
                    size={20}
                  />
                )}
              </CardHeader>
              <CardContent>{thought.content}</CardContent>
            </Card>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
