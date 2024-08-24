"use server";

import { db } from "@/lib";
import { useCurrentUser } from "./current-user";

export const useCurrentUserThoughts = async () => {
  try {
    const details = useCurrentUser();
    const currentUserId = details?.id;
    if (!currentUserId) {
      return [];
    }
    const thoughts = await db.thought.findMany({
      where: {
        userId: currentUserId,
      },
      include:{
        user:true
      }
    });
    return thoughts;
  } catch (error) {
    return null;
  }
};
