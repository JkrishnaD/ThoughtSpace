"use client";
import { Navbar } from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCurrentUserThoughts } from "@/hooks/user-thoughts";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { deleteThought } from "@/actions/deleteThought";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const MyThoughtsPage = () => {
  const [myThoughts, setMyThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    const fetchThoughts = async () => {
      const data = await useCurrentUserThoughts();
      if (data) {
        setMyThoughts(data);
      } else {
        setMyThoughts([]);
      }
    };
    fetchThoughts();
  }, [setMyThoughts]);

  const handleDelete = async (thoughtId: string) => {
    await deleteThought(thoughtId);
    toast.success("Thought Deleted");
    setMyThoughts(myThoughts.filter((thought) => thought.id !== thoughtId));
  };

  return (
    <div className="h-full w-full relative">
  <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
  
  <div className="z-10">
    <Navbar />
  </div>
  
  <div className="flex flex-col items-center font-mono z-10 w-full m-2">
    <h1 className="relative font-bold bg-white border rounded-sm w-fit z-10 p-3 bottom-2 shadow-sm shadow-black">
      Thoughts You Shared..
    </h1>
    
    <div className="flex justify-center w-full">
      {myThoughts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          {myThoughts.map((thought, index) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-black m-2 backdrop-blur-md shadow-sm shadow-black bg-white border-none overflow-y-auto h-[200px] lg:w-[400px]">
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
                  <MdDelete
                    onClick={() => handleDelete(thought.id)}
                    color="red"
                    className="hover:cursor-pointer"
                    size={20}
                  />
                </CardHeader>
                <CardContent className="overflow-y-auto flex-grow">{thought.content}</CardContent>
                <CardFooter className="mt-auto flex inset-x-0 bottom-0">
                  <p className="text-sm text-gray-500 bottom-0">
                    Thought Shared At:{" "}
                    {new Date(thought.createdAt).toLocaleString("en-US", {
                      hour12: true,
                    })}
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="z-10 mt-10 flex items-center justify-center flex-col text-center h-full">
          <p className="bg-white p-4 rounded-md border">
            You Don't have any Thoughts
          </p>
          <Button className="mt-4">
            <Link href="/home">Share Your Thoughts</Link>
          </Button>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default MyThoughtsPage;
