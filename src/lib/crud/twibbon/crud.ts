import { TwibbonProps } from "@/lib/types";
import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export const insertTwibbon = async (db: PoolConnection, data: TwibbonProps) => {
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query = `INSERT INTO twibbons (
    name,
    description,
    filename,
    url,
    created_at,
    slug,
    thumbnail
  ) VALUES (?,?,?,?,?,?,?)`;
  const [res] = await db.execute<ResultSetHeader>(query, [
    data.title,
    data.desc,
    data.fileName,
    data.filePath,
    currentDate,
    data.slug,
    data.thumbnail,
  ]);
  return res;
};
