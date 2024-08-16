import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

export async function redirectURLShort(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/api/:shortCode/detail",
    {
      schema: {
        params: z.object({
          shortCode: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { shortCode } = request.params;

      // Busca a URL original no banco de dados
      const urlEntry = await prisma.url.findUnique({
        where: { shortCode },
      });

      if (!urlEntry) {
        return reply.status(404).send({ error: "URL not found" });
      }

      // Redireciona para a URL original
      return reply.redirect(urlEntry.originalUrl);
    }
  );
}
