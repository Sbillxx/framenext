"use server";

import z from "zod";
import { StateProps } from "./types";
import { getUsername } from "./crud/login";
import { pool } from "./connection";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { encrypt } from "./session";
import { cookies } from "next/headers";
import { query } from "./database";

export const login = async (prevState: StateProps | undefined, formData: FormData) => {
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

// Interface untuk Twibbon data
interface Twibbon {
  id: number;
  name: string;
  description: string;
  filename: string;
  url: string;
  downloads: number;
  shares: number;
  created_at: string;
  slug: string;
  thumbnail: string;
}

// Get All Twibbons function
export const getAllTwibbon = async (): Promise<{
  success: boolean;
  data?: Twibbon[];
  count?: number;
  error?: string;
}> => {
  try {
    console.log("🔍 Fetching all twibbons from server action...");

    // Query untuk mengambil semua twibbon, diurutkan berdasarkan created_at DESC
    const twibbons = await query("SELECT * FROM twibbons ORDER BY created_at DESC");

    console.log("✅ Twibbons fetched successfully:", Array.isArray(twibbons) ? twibbons.length : 0);

    // Pastikan data dalam format yang benar
    const twibbonArray = Array.isArray(twibbons) ? (twibbons as Twibbon[]) : [];

    return {
      success: true,
      data: twibbonArray,
      count: twibbonArray.length,
    };
  } catch (error) {
    console.error("❌ Error fetching twibbons in server action:", error);
    return {
      success: false,
      error: "Failed to fetch twibbons",
    };
  }
};

// Get Twibbon by Slug function
export const getTwibbonBySlug = async (
  slug: string
): Promise<{
  success: boolean;
  data?: Twibbon;
  error?: string;
}> => {
  try {
    console.log("🔍 Fetching twibbon with slug:", slug);

    const twibbons = await query("SELECT * FROM twibbons WHERE slug = ?", [slug]);

    if (!Array.isArray(twibbons) || twibbons.length === 0) {
      console.log("❌ Twibbon not found for slug:", slug);
      return {
        success: false,
        error: "Twibbon not found",
      };
    }

    console.log("✅ Twibbon found:", twibbons[0]);
    return {
      success: true,
      data: twibbons[0] as Twibbon,
    };
  } catch (error) {
    console.error("❌ Error fetching twibbon by slug:", error);
    return {
      success: false,
      error: "Failed to fetch twibbon",
    };
  }
};

// Update Twibbon Downloads/Shares
export const updateTwibbonStats = async (
  slug: string,
  action: "download" | "share"
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> => {
  try {
    console.log(`📊 Updating twibbon ${action} for slug:`, slug);

    if (action === "download") {
      await query("UPDATE twibbons SET downloads = downloads + 1 WHERE slug = ?", [slug]);
    } else if (action === "share") {
      await query("UPDATE twibbons SET shares = shares + 1 WHERE slug = ?", [slug]);
    }

    console.log(`✅ Twibbon ${action} updated successfully`);
    return {
      success: true,
      message: `Twibbon ${action} updated successfully`,
    };
  } catch (error) {
    console.error(`❌ Error updating twibbon ${action}:`, error);
    return {
      success: false,
      error: `Failed to update twibbon ${action}`,
    };
  }
};
