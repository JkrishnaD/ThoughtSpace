"use client";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@/components/ui/input";
import { AvatarComponent } from "@/components/avatar";
import { useCurrentUser } from "@/hooks/current-user";

const HomePage = () => {

  const [thought, setThought] = useState("");
  const [displayThought, setDisplayThought] = useState("");
  const user=useCurrentUser();
  
  const onClick = () => {
    setDisplayThought(thought);
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
          >
            share
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-6">
        <div className="bg-white text-black p-4 rounded-lg">
          <div>
            <div className="flex flex-row items-center ">
              <AvatarComponent />
              {user?.name}
            </div>
          </div>
          {displayThought}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
