import { Avatar } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export const Navbar = () => {
  return (
    <div className="text-white flex flex-row justify-between z-20 p-4 px-20 bg-inherit">
      <div className="text-xl font-bold font-mono">ThoughtSpace</div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="font-bold">
            <Avatar>JK</Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 bg-white text-black p-2 rounded-md space-y-3 ">
            <DropdownMenuItem>Name</DropdownMenuItem>
            <DropdownMenuItem>My Thoughts</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
