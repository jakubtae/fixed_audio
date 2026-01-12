"use client";
import { Button } from "@/components/ui/button";
import GoogleButton from "@/components/auth/GoogleButton";
import { authClient } from "@/auth-client";
export default function Profile() {
  const { data: session } = authClient.useSession();

  return (
    <div>
      {session?.user && (
        <div className="flex w-full flex-col gap-2 items-center justify-center py-10">
          <p className="font-semibold">Signed in as {session.user.email}</p>{" "}
          {session.user.role && session.user.role === "ADMIN" && (
            <>
              <p className="font-semibold">You are an Admin</p>
            </>
          )}
          <Button
            type="submit"
            variant="destructive"
            onClick={() => authClient.signOut()}
          >
            Sign out
          </Button>
        </div>
      )}
      {!session?.user && (
        <div className="flex flex-col gap-2 justify-center items-center py-10">
          <div className="max-w-2xl flex flex-col gap-6 rounded-2xl p-6 border border-gray-200">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold md:text-4xl">Log in</h1>
              <h2 className="text-lg md:text-2xl font-semibold">
                To unlock premium features
              </h2>
            </div>
            <GoogleButton />
          </div>
        </div>
      )}
    </div>
  );
}
