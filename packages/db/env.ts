import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PAYMENT_METHODS: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {},
});
