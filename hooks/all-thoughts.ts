"use server"
import { db } from "@/lib";

export const useGetThoughts = async () => {
  try {
    const allthoughts = await db.thought.findMany({
      include: {
        user: true,
      },
    });
    return allthoughts;
  } catch (error) {
    console.log(error);
    return [];
  }
};
