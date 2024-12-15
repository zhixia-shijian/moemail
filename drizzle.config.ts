import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  driver: "d1-http",
  schema: "./app/lib/schema.ts",
  dbCredentials: {
    accountId: "66c1853bb39df5aee672ecb562e702a3",
    databaseId: "temp_mail_db",
    token: "8832c0ab-630b-4319-8442-6d7808a99926"
  },
} satisfies Config; 