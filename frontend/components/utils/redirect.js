import { useRouter } from "next/router";

function RedirectToHome(user) {
  const router = useRouter();
  if (user) {
    if (typeof window !== "undefined") {
      router.push("/");
    }
  }
}

export default RedirectToHome;
