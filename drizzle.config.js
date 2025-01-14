import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://jollysidecoder:57PvgHaMEmAe@ep-royal-morning-a5d1meug.us-east-2.aws.neon.tech/interior-ai-decor?sslmode=require",
  },
});
