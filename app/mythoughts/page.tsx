"use client";
import { Navbar } from "@/components/navbar";
import { useCurrentUserThoughts } from "@/hooks/user-thoughts";
import { useEffect, useState } from "react";

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
      console.log(data);
      if (data) {
        setMyThoughts(data);
      } else {
        setMyThoughts([]);
      }
    };
    fetchThoughts();
  }, []);

  return (
    <div className="text-black h-full w-full">
      <div className="bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
        <div>
          <Navbar />
        </div>
        <div>
          {myThoughts.map((thought) => (
            <div key={thought.id}>
              <p>{thought.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyThoughtsPage;
