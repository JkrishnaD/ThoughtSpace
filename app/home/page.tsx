"use client";
import { Navbar } from "@/components/navbar";
import { useState, useTransition } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@/components/ui/input";
import { sendThought } from "@/actions/addThought";
import { toast } from "sonner";
import { DisplayThought } from "@/components/dispaly-thoughts";

const HomePage = () => {
  const [thought, setThought] = useState("");
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      sendThought({ thought });
      toast.success("Thought Created");
    });
  };

  return (
    <div className="fixed inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div>
        <Navbar />
      </div>
      <div className="relative mt-20 flex justify-center items-center">
        <div className="flex items-center justify-center flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 font-mono">
          <Input
            className="backdrop-blur-lg bg-transparent h-fit placeholder:text-white text-white w-[300px] lg:w-[600px] p-4"
            placeholder="Share Your Thought....."
            onChange={(e) => setThought(e.target.value)}
          />
          <Button
            size="lg"
            variant="bordered"
            className="bg-inherit text-white border hover:bg-white hover:text-black rounded-md p-4 transition"
            onClick={onClick}
            isDisabled={isPending}
          >
            share
          </Button>
        </div>
      </div>
      <div className="text-white">
        <DisplayThought />
      </div>
    </div>
  );
};

export default HomePage;
