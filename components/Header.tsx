"use client";

import Link from "next/link";
import React from "react";
import { UserNav } from "../app/(auth)/UserNav";
import { SearchModalComponent } from "./SearchComponent";

function Header() {
  return (
    <header className="flex border border-b-1 border-gray-200">
      <nav
        className="flex container mx-auto max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <Link className="flex items-center gap-1" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 rotate-90 text-primary hidden lg:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>

          <span className="font-bold text-primary hidden lg:block">
            VibesRa
          </span>
        </Link>
        <SearchModalComponent />
        <UserNav />
      </nav>
    </header>
  );
}

export default Header;
