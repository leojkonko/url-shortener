import fastify from "fastify";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createURLShort } from "./routes/create-url-short";
import { redirectURLShort } from "./routes/redirect-url-short";
import dotenv from "dotenv";

dotenv.config();

const app = fastify();

app.register(cors, {
  origin: "*", // endereço do front p acessar back
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createURLShort);
app.register(redirectURLShort);

app.listen({ port: 3333 }).then(() => {
  console.log(`Server running on ${process.env.API_BASE_URL} !!!`);
});
