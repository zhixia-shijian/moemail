/// <reference types="@cloudflare/workers-types" />

declare global {
  interface CloudflareEnv {
    DB: D1Database;
  }

  type Env = CloudflareEnv
}

export type { Env }