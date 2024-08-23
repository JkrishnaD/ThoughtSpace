import { useGetThoughts } from "@/hooks/all-thoughts";
import React, { useEffect, useState } from "react";

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
    async () => {
      const data = await useGetThoughts();
      setThoughts(data);
    };
  }, []);

  return (
    <div className="text-white">
      {thoughts.map((thought) => (
        <>
          <div className="text-white">{thought.content}</div>
          <div>{thought.user.name}</div>
        </>
      ))}
    </div>
  );
};
