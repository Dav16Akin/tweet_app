import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import React from "react";
import { dark } from "@clerk/themes";

const Topbar = () => {
  return (
    <nav className="h-12 fixed w-full text-white top-0 z-30 flex justify-between items-center px-4 bg-black">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="Logo" width={36} height={36} />
          <h1 className="font-bold text-2xl">Tweet</h1>
        </Link>
      </div>

      <div className="flex justify-evenly gap-1 items-center">
        <div className="md:hidden">
          <SignedIn>
            <SignOutButton>
              <MdLogout />
            </SignOutButton>
          </SignedIn>
        </div>

        <div className="max-lg:hidden"> 
          <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        ></OrganizationSwitcher>
        </div>
       
      </div>
    </nav>
  );
};

export default Topbar;
