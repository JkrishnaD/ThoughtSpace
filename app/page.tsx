import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      <div className="flex justify-center items-center h-full">
        <div>
          <h1>Thought Space</h1>
          <div className="flex flex-col justify-center items-center text-xl">
            <div>"Capture Your Thoughts And Share Your Voice"</div>
            <Button>
              <Link href="/home">Explore More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
