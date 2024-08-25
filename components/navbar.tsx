"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DEFAULT_PUBLIC_ROUTE } from "@/routes";
import { AvatarComponent } from "./avatar";

export const Navbar = () => {
  const user = useCurrentUser();
  return (
    <div className="text-black flex flex-row justify-between p-4 lg:px-20 px-10 bg-inherit">
      <div className=" z-10 text-xl font-bold font-mono">
        <Link className="bg-white p-2" href="/home">ThoughtSpace</Link>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="font-bold text-black">
            <AvatarComponent/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 bg-white text-black p-2 rounded-md space-y-3 ">
            <DropdownMenuItem>{user?.name || ""}</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/mythoughts">My THoughts</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={() => signOut({callbackUrl:DEFAULT_PUBLIC_ROUTE})}>Logout</Button>{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
