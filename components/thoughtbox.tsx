import { Input } from "./ui/input";
import { Button } from "@nextui-org/button";
export const ThoughtBox = () => {
  return (
    <div>
      <div className="flex items-center justify-center flex-col lg:flex-row space-x-4 font-mono">
        <Input
          className="backdrop-blur-lg bg-transparent h-fit placeholder:text-white text-white w-[300px] lg:w-[600px] p-4"
          placeholder="Share Your Thought"
        />
        <Button
          size="lg"
          variant="bordered"
          className="bg-inherit text-white border hover:bg-white hover:text-black rounded-md p-3.5 transition "
        >
          share
        </Button>
      </div>
    </div>
  );
};
