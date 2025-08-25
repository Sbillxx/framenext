// server komponent
import { Form } from "@/components/contoh/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Contoh",
  description: "Halaman contoh CRUD nya",
};
const ContohPage = async () => {
  return <Form />;
};
export default ContohPage;
