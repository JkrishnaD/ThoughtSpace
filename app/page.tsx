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
import { TfiThought } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";

export default function Home() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="fixed inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 bottom-0 transform -translate-x-1/2 m-auto h-[200px] w-full rounded-full bg-black opacity-20 blur-[100px] z-10"></div>
      <div className="relative flex justify-center flex-col items-center h-full font-mono z-20">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl flex items-center text-center flex-col lg:flex-row space-x-2 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to
              <span className="flex flex-row">
                <TfiThought className="bg-transparent mx-3" />
                ThoughtSpace
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-800 text-sm md:text-xl dark:text-gray-400">
            Express your <b>Thoughts</b>, connect with like-minded individuals, and discover fresh perspectives in a secure and vibrant space.
            </p>
          </div>
          <div className="flex space-x-4 flex-col lg:flex-row justify-center gap-2 items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Get Started With
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white text-black border-gray-800 z-50">
                <DialogHeader className="flex gap-2 items-center">
                  <DialogTitle className="font-bold">Sign In</DialogTitle>
                  <DialogDescription className="font-semibold text-gray-700">
                    Sign In Using Your Google or Github Account
                  </DialogDescription>
                </DialogHeader>
                <Button
                  className="w-full bg-white text-gray-800 hover:text-black mb-2"
                  variant="ghost"
                  onClick={() => onClick("google")}
                >
                  <FcGoogle className="mr-2" /> Sign in with Google
                </Button>
                <Button
                  className="w-full bg-black text-white"
                  onClick={() => onClick("github")}
                >
                  <FaGithub className="mr-2" /> Sign in with GitHub
                </Button>
              </DialogContent>
            </Dialog>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
        <footer className="absolute gap-3 p-2 bottom-0 flex items-center justify-center z-20">
          <h1>
            Devloped By
            <span className="font-bold cursor-pointer hover:underline">
              JayaKrishna🥰
            </span>
          </h1>
          <div className="flex justify-center gap-2">
            <Link href="https://github.com/JkrishnaD">
              <FaGithub size={25} />
            </Link>
            <Link href="https://x.com/jkrishna_d">
              <BsTwitterX size={25} />
            </Link>
            <Link href="https://www.linkedin.com/in/jayakrishna-dabbara-a1b633261/">
              <FaLinkedin size={25} />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
