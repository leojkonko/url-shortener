import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

export async function redirectURLShort(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/api/:shortCode",
    {
      schema: {
        params: z.object({
          shortCode: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { shortCode } = request.params;

      const urlEntry = await prisma.url.findUnique({
        where: { shortCode: shortCode },
      });

      if (!urlEntry) {
        return reply.status(404).send({ error: "Short URL not found in DB" });
      }

      return {
        originalUrl: urlEntry.originalUrl,
      };
    }
  );
}
