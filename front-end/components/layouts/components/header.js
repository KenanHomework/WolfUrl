"use client";
import Image from "next/image";
import { Button, Link } from "@nextui-org/react";
import { useUserSignedIn, useUserUsername } from "@/utils/auth";
import ProfileOptions from "@/components/layouts/components/profileOptions";

export default function Header() {
  const signedIn = useUserSignedIn();

  return (
    <div className={"w-full h-16 flex items-center"}>
      <Link href={"/"} className={"w-44 flex items-center gap-2"}>
        <Image src={"/logo.svg"} alt={"Logo"} width={50} height={50} />
        <h1 className={"font-medium text-xl text-black"}>Wolf Url</h1>
      </Link>
      <div className={"w-full flex items-center justify-end gap-2"}>
        {signedIn ? (
          <div className={"flex items-center gap-4"}>
            <Button
              href={"/links"}
              as={Link}
              variant={"light"}
              color={"primary"}
            >
              Links
            </Button>
            <ProfileOptions />
          </div>
        ) : (
          <>
            <Button
              href={"/auth/sign-in"}
              as={Link}
              variant={"light"}
              color={"primary"}
            >
              Log in
            </Button>
            <Button
              href={"/auth/sign-up"}
              as={Link}
              color={"primary"}
              variant={"bordered"}
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
