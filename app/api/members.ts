// pages/api/members.ts
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "../../lib/logger";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  logger.info({ route: "/api/members", method: req.method }, "Incoming request");

  try {
    // contoh operasi DB
    // const members = await db.getMembers();
    logger.info({ membersCount: 12 }, "Fetched members");
    res.status(200).json({ ok: true });
  } catch (err) {
    logger.error({ err, route: "/api/members" }, "Failed to fetch members");
    res.status(500).json({ error: "Server error" });
  }
}
