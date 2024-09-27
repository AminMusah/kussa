"use server";

import { cookies } from "next/headers";

export default async function create(data: any) {
  cookies().set("sessionId", data, { secure: true });
}
