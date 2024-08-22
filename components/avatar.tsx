import { useCurrentUser } from "@/hooks/current-user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const AvatarComponent = () => {
  const user = useCurrentUser();
  return (
    <Avatar className="hover:scale-125 transition">
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback>
        {user?.name
          ?.split(" ")
          .map((word) => word[0])
          .join("") || ""}
      </AvatarFallback>
    </Avatar>
  );
};
