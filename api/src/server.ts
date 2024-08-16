import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createURLShort } from "./routes/create-url-short";
import { redirectURLShort } from "./routes/redirect-url-short";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createURLShort);
app.register(redirectURLShort);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running on http://localhost:3333!");
});
