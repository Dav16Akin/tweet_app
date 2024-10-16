"use client";
import React from "react";
import { sidebarLinks } from "@/constants/index";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import { MdLogout } from "react-icons/md";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="overflow-auto bg-black text-white pb-5 pt-28 max-md:hidden flex flex-col justify-between sticky left-0 top-0 z-20 h-screen w-fit">
      <div className="flex flex-1 flex-col gap-1 px-6 w-full">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (
            <Link
              className={`flex items-center justify-start gap-4 rounded-lg p-4 ${
                isActive && "bg-indigo-500"
              }`}
              href={link.route}
              key={link.label}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                height={28}
                width={28}
              ></Image>
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <button className="mb-4 px-10 cursor-pointer">
        <SignedIn>
          <SignOutButton redirectUrl="/sign-in">
            <div className="flex items-center gap-4">
              <MdLogout fontSize={28} />
              <p className="max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </button>
    </section>
  );
};

export default LeftSidebar;
