"use server";

import z from "zod";
import { StateProps } from "./types";
import { getUsername } from "./crud/login";
import { pool } from "./connection";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { encrypt } from "./session";
import { cookies } from "next/headers";

export const login = async (
  prevState: StateProps | undefined,
  formData: FormData
) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const ValidateInput = z
    .object({
      username: z.string().min(1, "Username tidak boleh kosong!"),
      password: z.string().min(6, "Password minimal 6 karakter!"),
    })
    .safeParse({ username, password });

  if (!ValidateInput.success) {
    return {
      status: 0,
      message: "Validasi gagal!",
      fields: JSON.stringify(ValidateInput.error.flatten().fieldErrors),
      values: { username: username, password: password },
    };
  }

  let db;
  try {
    db = await pool.getConnection();
    const user = await getUsername(db, username);
    if (!user.status) {
      return {
        status: 0,
        message: "Username tidak ditemukan!",
        values: { username: username, password: password },
      };
    }

    const passMatch = await bcrypt.compare(password, user.data?.[0]?.password);
    console.log("Password Match: ", passMatch);
    if (!passMatch) {
      return {
        status: 0,
        message: "Password tidak sesuai!",
        values: { username: username, password: password },
      };
    }
    const sessionData = {
      id: user.data?.[0]?.id,
      nama: user.data?.[0]?.name,
      rid: "",
      pict: "",
    };
    const expires = new Date(Date.now() + 3 * 60 * 60 * 1000);
    const session = await encrypt({ sessionData, expires });

    (await cookies()).set("session", session, {
      expires,
      httpOnly: true,
    });
  } catch (error) {
    console.log("Error get username: ", error);
    return {
      status: 0,
      message: "Interval service error!",
      values: { username: username, password: password },
    };
  } finally {
    if (db) db.release();
  }

  redirect("/admin");
};
