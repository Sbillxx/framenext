"use server";

import { StateProp } from "./types";

export const login = async (
  prevState: StateProp | undefined,
  formData: FormData
) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  return { status: true, message: "Data berhasil dikirim" };
};
