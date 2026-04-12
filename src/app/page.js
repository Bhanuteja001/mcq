import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginPage from "@/components/LoginPage";
import { verifyToken } from "@/lib/jwt";

export default function Home() {
  const cookieStore = cookies();
  const tokenCookie =
    typeof cookieStore.get === "function"
      ? cookieStore.get("token")
      : cookieStore?.token;
  const token = tokenCookie?.value ?? tokenCookie;

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
