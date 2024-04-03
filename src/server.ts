import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import { createEvent } from "./routes/create-event";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider  } from "fastify-type-provider-zod";
import { getEvent } from "./routes/get-events";
import { registerForEvent } from "./routes/register-for-event";
import { getAttendeesBadge } from "./routes/get-attendees-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors,{
  origin: '*'
})

app.register(fastifySwagger,{
  swagger:{
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o back-end da aplicação pass.on construída durante o NLW Unite da Rocketseat',
      version: '1.0.0'
    }
  },
  transform : jsonSchemaTransform,
})

app.register(fastifySwaggerUi,{
  routePrefix: '/docs'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)
app.register(getEvent)
app.register(registerForEvent)
app.register(getAttendeesBadge)
app.register(checkIn)
app.register(getEventAttendees)


app.listen({port: 3333, host: '0.0.0.0'}).then(()=>{
  console.log('HTTP server running!')
})