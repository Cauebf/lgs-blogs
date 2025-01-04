"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const SignIn = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      ) : (
        <div>
          {/* <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default SignIn;
