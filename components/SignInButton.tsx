"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const SignIn = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {status === "unauthenticated" ? (
        <button
          className="flex items-center space-x-2"
          onClick={() => signIn("github")}
        >
          <span className="text-white hover:text-gray-200 transition-colors duration-200">
            Sign in with GitHub
          </span>
          <Image
            src="/github-logo.png"
            alt="GitHub Logo"
            width={35}
            height={35}
          />
        </button>
      ) : (
        <div className="relative">
          <div
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="cursor-pointer flex items-center space-x-2"
          >
            <span className="text-white">{session?.user?.name ?? "User"}</span>
            <Image
              src={session?.user?.image || "/profile-pic.png"}
              alt={session?.user?.name || "User"}
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>

          {dropdownOpen && (
            <div
              className="absolute mt-1 w-full bg-white text-black shadow-lg rounded-lg transform opacity-0 translate-y-4 transition-all duration-300 ease-out"
              style={{
                animation: "dropDown 0.3s forwards",
              }}
            >
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SignIn;
