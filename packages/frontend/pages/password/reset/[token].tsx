import React from "react";
import { useRouter } from "next/router";
import ResetPassword from "../../../components/auth/ResetPassword";
import Main from "../../../components/layout/Main";

export default function ChangePassword(): JSX.Element {
  const router = useRouter();
  const { token } = router.query;
  return <Main Body={() => <ResetPassword token={token as string} />} />;
}
