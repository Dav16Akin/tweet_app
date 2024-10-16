"use client"
import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Bottombar = () => {
  const pathname = usePathname();
  return (
    <section className="fixed flex w-full z-10 bottom-0 rounded-3xl bg-zinc-950/95">
      <div className="flex justify-between w-full gap-3 md:hidden">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              className={`flex flex-col items-center justify-start rounded-3xl gap-4 p-4 ${
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
              <p className="text-light-1 text-sm max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
