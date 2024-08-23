"use server"

import { ThoughtSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib";
import { auth } from "@/auth";
export const sendThought = async (values: z.infer<typeof ThoughtSchema>) => {
  const details = await auth();
  console.log(details);
  const validate = ThoughtSchema.safeParse(values);
  if (!validate) {
    return null;
  }

  const userEmail = details?.user?.email as string;
  const { thought }: any = validate.data; // Extract validated thought content

  await db.thought.create({
    data: {
      content: thought,
      user: {
        connect: { email: userEmail },
      },
    },
  });
};
