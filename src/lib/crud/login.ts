import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { unstable_noStore as noStore } from "next/cache";
export const getUsername = async (db: PoolConnection, username: string) => {
  noStore();
  try {
    const query = "SELECT * FROM sysuser WHERE username = ? AND is_active = 1";
    const [rows] = await db.execute<RowDataPacket[]>(query, [username]);
    return { status: true, data: rows };
  } catch (error) {
    return { status: false };
  }
};
