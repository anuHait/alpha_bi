"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/services/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");
  console.log({ user });
  const router = useRouter();
  if (!user && !userSession) {
    router.push("/signin");
  }
  return (
    <div className={`p-8 flex  flex-col items-center justify-center`}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mb-5 rounded-;g "
        onClick={() => {
          signOut(auth);
          if (typeof window !== 'undefined') {
            window.sessionStorage.removeItem("user");
          }        }}
      >
        Log out
      </button>
      <div
        className={`search-container transition-all ease-in-out duration-300  ${
          isFocused
            ? "w-[80%] lg:w-[83%] h-[86vh]"
            : "w-[65%] lg:w-[39%] h-auto"
        } bg-white border border-gray-300 flex rounded-lg  `}
      >
        <div>
          <div className="flex flex-row gap-3 m-5">
            <input
              type="text"
              className={` flex-1 h-full p-5 bg-gray-200 rounded-lg w-[90%]`}
              placeholder="Search..."
              onFocus={handleFocus}
            />
            <button
              className={`bg-black text-white font-semibold py-2 px-4  rounded-lg`}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
