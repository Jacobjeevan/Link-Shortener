import { useRouter } from "next/router";

function RedirectToHome() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/");
  }
}

export default RedirectToHome;
