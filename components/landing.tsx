import Link from "next/link";
import { Button } from "./ui/button";

export const LandingPage = () => {
  return (
    <div>
      <h1>Thought Space</h1>
      <div className="flex flex-col justify-center items-center text-xl">
        <div>"Capture Your Thoughts And Share Your Voice"</div>
        <Button>
          <Link href="/home">Explore More</Link>
        </Button>
      </div>
    </div>
  );
};
