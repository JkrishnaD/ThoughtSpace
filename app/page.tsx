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
    <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="flex justify-center flex-col space-y-4 items-center h-full">
        <h1 className="font-bold text-3xl text-black">
          Thought Space
        </h1>
        <div className="text-gray-800">"Capture Your Thoughts And Share Your Voice"</div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">Share</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white text-black border-gray-800">
              <DialogHeader className="flex gap-2 items-center">
                <DialogTitle className="font-bold">Sign In</DialogTitle>
                <DialogDescription className="font-semibold text-gray-700">
                  Sign In Using Your Google or Github Account
                </DialogDescription>
              </DialogHeader>
              <Button className="w-full bg-black text-white hover:bg-gray-800 mb-2" onClick={() => onClick("google")}>
                <FcGoogle className="mr-2" /> Sign in with Google
              </Button>
              <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={() => onClick("github")}>
                <FaGithub className="mr-2" /> Sign in with GitHub
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
