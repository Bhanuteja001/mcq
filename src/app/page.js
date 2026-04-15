import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginPage from "@/components/LoginPage";
import { verifyToken } from "@/lib/jwt";

export default async function Home() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie?.value;

  if (token) {
    try {
      verifyToken(token);
      redirect("/dashboard");
    } catch (error) {
      // Invalid token, show login page
    }
  }

  return <LoginPage />;
}
