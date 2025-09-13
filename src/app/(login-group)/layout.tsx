import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login admin Twibbon",
  description: "Halaman Login admin khusus!",
};

export default function LoginLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
