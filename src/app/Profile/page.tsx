import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { setUserName } from "./userStore";
import BackButton from "../BackButton";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;

  if (user && user.name) {
    setUserName(user.name);
  }

  // Perform any local actions if needed for the user (e.g., logging)
  if (user && user.email && user.name) {
    console.log(`User signed in: ${user.name} (${user.email})`);
  }

  return user ? (
    <div>
      <BackButton />
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="h-screen space-y-10 flex flex-col justify-center items-center bg-gray-300 text-zinc-600"
      >
        <h1 className="text-5xl">Welcome {user.name}!</h1>
        <button type="submit" className="bg-zinc-600 text-gray-300 rounded-xl p-3">
          SignOut
        </button>
      </form>
    </div>
  ) : (
    <form
      className="flex justify-center items-center text-zinc-600 bg-gray-300 h-screen"
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"></link>
      <Link
        href="./"
        className="flex justify-center items-center w-10 h-10 absolute top-10 left-10 rounded-full bg-zinc-600 text-gray-300 text-3xl"
      >
        <i className="uil uil-arrow-left"></i>
      </Link>

      <button type="submit" className="flex justify-center items-center space-x-3 bg-white px-5 py-3 rounded-3xl">
        <span>Signin with Google</span>
        <Image src="/google.png" width={30} height={30} alt="Google" />
      </button>
    </form>
  );
}
