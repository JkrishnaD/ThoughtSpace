"use server"
import { db } from "@/lib";
import { useCurrentUser } from "./current-user";
import { currentUser } from "@/libs/server";

export const useCurrentUserThoughts = async () => {
    const details = await currentUser();
    const currentUserId = details?.id;

    if (!currentUserId) {
      return [];
    }
    
    const thoughts = await db.thought.findMany({
      where: {
        userId: currentUserId,
      },
      include: {
        user: true,
      },
    });
    return thoughts;
};
