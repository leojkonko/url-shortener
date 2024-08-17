import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import zod, { z } from "zod";
import prisma from "../../prisma";

export async function createURLShort(app: FastifyInstance) {
  const { customAlphabet } = await import("nanoid");
  const generateShortCode = customAlphabet(
    "abcdefghijklmnopqrstuvwxyz0123456789",
    5
  );
  app.withTypeProvider<ZodTypeProvider>().post(
    "/api/url",
    {
      schema: {
        body: z.object({
          originalUrl: z.string().url(),
        }),
      },
    },
    async (request) => {
      const { originalUrl } = request.body;
      const shortCode = generateShortCode();
      try {
        const newUrl = await prisma.url.create({
          data: {
            originalUrl,
            shortCode,
          },
        });

        return {
          originalUrl: newUrl.originalUrl,
          shortUrl: `${newUrl.shortCode}`,
        };
      } catch (error) {
        const existingEntry = await prisma.url.findUnique({
          where: { shortCode },
        });

        if (existingEntry) {
          return {
            originalUrl: existingEntry.originalUrl,
            shortUrl: `${process.env.API_BASE_URL_FRONTEND}${existingEntry.shortCode}`,
          };
        }

        throw error;
      }
    }
  );
}
