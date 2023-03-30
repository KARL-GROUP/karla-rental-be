import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KARL Rental",
      description: "KARL Rental",
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://karla-rental-be-development.up.railway.app",
      },
    ],
  },
  apis: ["src/**/*doc.ts"],
};

export const swaggerDoc = swaggerJsdoc(options);
