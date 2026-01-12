"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { authClient } from "@/auth-client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
const GoogleButton = () => {
  const onClick = (provider: "google" | "github") => {
    authClient.signIn.social({
      provider,
      callbackURL: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full"
      onClick={() => onClick("google")}
    >
      <FcGoogle className="h-5 w-5" />
      Continue with Google{" "}
    </Button>
  );
};

export default GoogleButton;
