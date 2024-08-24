"use server"
import { db } from "@/lib";

export const deleteThought = async (thoughtId: string) => {
  try {
    await db.thought.delete({
      where: {
        id: thoughtId,
      },
    });
  } catch (error) {
    return null;
  }
};
