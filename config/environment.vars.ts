import { object, string, infer } from "zod";

const envVar = object({
  DATABASE_URL: string(),
  AUTH_SECRET: string(),
});

envVar.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends infer<typeof envVar> {}
  }
}
