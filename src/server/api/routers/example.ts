import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(2),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.example.create({
        data: {
          content: input.content,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.example.findMany();
  }),
});
