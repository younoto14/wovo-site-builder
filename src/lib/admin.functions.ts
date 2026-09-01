import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";

type AdminSession = { admin?: true };

const DEFAULT_PASSWORD = "1234";

function sessionConfig() {
  return {
    password: process.env["ADMIN_SESSION_SECRET"]!,
    name: "wovo-admin",
    maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function hashPassword(value: string): string {
  return createHash("sha256")
    .update(`${process.env["ADMIN_SESSION_SECRET"] ?? ""}:${value}`, "utf8")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

async function currentHash(): Promise<string> {
  const db = await admin();
  const { data } = await db.from("admin_config").select("password_hash").eq("id", 1).maybeSingle();
  if (data?.password_hash) return data.password_hash;
  const seeded = hashPassword(DEFAULT_PASSWORD);
  await db.from("admin_config").insert({ id: 1, password_hash: seeded });
  return seeded;
}

async function requireAdmin() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.admin) throw new Error("Unauthorized");
  return session;
}

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  return { authenticated: session.data.admin === true };
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ password: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }) => {
    const expected = await currentHash();
    if (!safeEqual(hashPassword(data.password), expected)) {
      return { ok: false as const };
    }
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ admin: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const adminSaveContent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        entries: z.array(
          z.object({ key: z.string().min(1).max(120), value: z.string().max(20000) }),
        ),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    if (data.entries.length === 0) return { ok: true as const };
    const db = await admin();
    const { error } = await db
      .from("site_content")
      .upsert(
        data.entries.map((e) => ({ key: e.key, value: e.value, updated_at: new Date().toISOString() })),
        { onConflict: "key" },
      );
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const adminChangePassword = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ password: z.string().min(4).max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const { error } = await db
      .from("admin_config")
      .upsert(
        { id: 1, password_hash: hashPassword(data.password), updated_at: new Date().toISOString() },
        { onConflict: "id" },
      );
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
