"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Home() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      <div className="flex justify-center flex-col space-y-4 items-center h-full">
        <h1 className="font-bold text-3xl text-black bg-clip-text">Thought Space</h1>
          <div>"Capture Your Thoughts And Share Your Voice"</div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Share</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Sign In</DialogTitle>
                  <DialogDescription>
                    Sign In Using Your Google or Github Account
                  </DialogDescription>
                </DialogHeader>
                <Button onClick={() => onClick("google")}>
                  <FcGoogle />
                </Button>
                <Button onClick={() => onClick("github")}>
                  <FaGithub />
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
  );
}
