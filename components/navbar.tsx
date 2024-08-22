"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/current-user";


export const Navbar = () => {
  const user = useCurrentUser();
  return (
    <div className="text-white flex flex-row justify-between z-20 p-4 px-20 bg-inherit">
      <div className="text-xl font-bold font-mono">
        <Link href="/home">ThoughtSpace</Link>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="font-bold">
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 bg-white text-black p-2 rounded-md space-y-3 ">
            <DropdownMenuItem>Name</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/mythoughts">My THoughts</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={() => signOut()}>Logout</Button>{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
