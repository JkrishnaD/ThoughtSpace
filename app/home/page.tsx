"use client";
import { Navbar } from "@/components/navbar";
import { useState, useTransition } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@/components/ui/input";
import { sendThought } from "@/actions/addThought";
import { toast } from "sonner";
import { DisplayThought } from "@/components/dispaly-thoughts";
import { motion } from "framer-motion";

const HomePage = () => {
  const [thought, setThought] = useState("");
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    if (!thought || thought.trim() === "") {
      toast.error("Thought is Empty!");
      return null;
    }
    startTransition(() => {
      sendThought({ thought });
      toast.success("Thought Created");
    });
  };

  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Navbar />
        </motion.div>
        <motion.div
          className="mt-15 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 font-mono">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Input
                className="backdrop-blur-lg bg-white h-fit placeholder:text-black text-black w-[300px] lg:w-[600px] p-4"
                placeholder="Share Your Thought....."
                onChange={(e) => setThought(e.target.value)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="text-black border bg-white rounded-md p-4 transition"
                onClick={onClick}
                isDisabled={isPending}
              >
                share
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="flex-grow overflow-y-auto text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <DisplayThought />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
