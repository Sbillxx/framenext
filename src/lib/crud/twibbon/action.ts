"use server";
import { StateProps } from "@/lib/types";
import path from "path";
import fs from "fs";
import { pool } from "@/lib/connection";
import { insertTwibbon } from "./crud";
import z from "zod";
import { data } from "framer-motion/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const SimpanTwibbon = async (
  prevState: StateProps | undefined,
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const slug = formData.get("slug") as string;
  const image = formData.get("image64") as string;
  const thumbnail = formData.get("thumbnail") as string;

  //validasi
  const ValidasiInput = z
    .object({
      title: z.string().min(1, "Judul tidak boleh kosong!"),
      desc: z.string().min(1, "Deskripsi tidak boleh kosong!"),
      slug: z.string().min(1, "Slug tidak boleh kosong!"),
    })
    .safeParse({ title: title, desc: desc, slug: slug });

  if (!ValidasiInput.success) {
    return {
      status: 401,
      fields: JSON.stringify(ValidasiInput.error.flatten().fieldErrors),
      message: "Validasi Gagal!",
      values: { title: title, desc: desc, slug: slug },
    };
  }

  let db;
  try {
    db = await pool.getConnection();
    if (!image || !image.startsWith("data:image/")) {
      return { status: 400, message: "Invalid Image!" };
    }
    if (!thumbnail || !thumbnail.startsWith("data:image/")) {
      return { status: 400, message: "Invalid Image!" };
    }

    // upload image
    const base64Image = image.split(",")[1];
    const base64thumbnail = thumbnail.split(",")[1];
    const buffer = Buffer.from(base64Image, "base64");
    const thumbnailBuffer = Buffer.from(base64thumbnail, "base64");
    if (buffer.length > 0 || thumbnailBuffer.length > 0) {
      if (
        buffer.length > MAX_FILE_SIZE ||
        thumbnailBuffer.length > MAX_FILE_SIZE
      ) {
        console.log("Kelebihan file size nya! MAX 5mb");
        return {
          status: 0,
          fields: "",
          message: `File terlalu besar! Ukuran maksimal adalah ${
            MAX_FILE_SIZE / (1024 * 1024)
          } Mb`,
        };
      }
      const imgPath = "/uploads/";
      const imgThumb = "/thumbnail/";
      const uploadPath = path.join(process.cwd(), `/public${imgPath}`);
      const uploadPath2 = path.join(process.cwd(), `/public${imgThumb}`);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      if (!fs.existsSync(uploadPath2)) {
        fs.mkdirSync(uploadPath2, { recursive: true });
      }

      const matches = image.match(
        /^data:(image\/(jpeg|jpg|png|webp));base64,(.+)$/
      );
      const matches2 = thumbnail.match(
        /^data:(image\/(jpeg|jpg|png|webp));base64,(.+)$/
      );
      if (!matches || !matches2) {
        return {
          status: 0,
          fields: "",
          message: `File tidak support! Hanya support file jpeg, jpg, png, webp`,
        };
      }
      const mimeType = matches[1];
      const mimeType2 = matches2[1];
      const ext = mimeType.split("/")[1];
      const ext2 = mimeType2.split("/")[1];
      const imgName = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}.${ext}`;
      const imgName2 = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}.${ext2}`;
      const filePath = path.join(uploadPath, imgName);
      const filePath2 = path.join(uploadPath2, imgName2);

      //insert db
      const data = {
        title: title,
        desc: desc,
        slug: slug,
        fileName: imgName,
        filePath: filePath,
        thumbnail: imgName2,
      };

      const insertData = await insertTwibbon(db, data);
      if (insertData.affectedRows > 0) {
        fs.writeFileSync(filePath, buffer);
        fs.writeFileSync(filePath2, thumbnailBuffer);
      }
    }
    return { status: 200, message: "Data berhasil disimpan!" };
  } catch (error) {
    console.log("Error input data : ", error);
    return {
      status: 500,
      message: "Error input twibbon!",
    };
  } finally {
    if (db) db.release();
  }
};
