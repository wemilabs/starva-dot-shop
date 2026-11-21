"use server";

import { db } from "@starva/db/drizzle";
import { type AdminActionType, adminAuditLog } from "@starva/db/schema";
import { headers } from "next/headers";

type AuditLogParams = {
  adminId: string;
  action: AdminActionType;
  targetId?: string;
  targetType?: "user" | "email" | "feedback" | "order" | "product";
  metadata?: Record<string, unknown>;
};

export async function logAdminAction({
  adminId,
  action,
  targetId,
  targetType,
  metadata,
}: AuditLogParams) {
  const headersList = await headers();
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  await db.insert(adminAuditLog).values({
    adminId,
    action,
    targetId,
    targetType,
    metadata: metadata ? JSON.stringify(metadata) : null,
    ipAddress,
    userAgent,
  });
}
