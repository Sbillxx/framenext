import AdminPanel from "@/components/admin/AdminPanel";
import { getMySession, isSessionExpired } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getMySession();
  if (session) {
    if (isSessionExpired(session)) {
      (await cookies()).set("session", "", { expires: new Date(0) });
      return redirect("/adminlogin");
    }
  }
  if (!session) return redirect("/adminlogin");
  return <AdminPanel />;
}
