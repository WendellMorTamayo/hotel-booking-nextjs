import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { UserNav } from "./auth/UserNav";

function Header() {
  return (
    <header className="border border-b-1 border-gray-200">
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
            className="w-8 h-8 rotate-90 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>

          <span className="font-bold text-primary">VibesRa</span>
        </Link>
        <div className="flex gap-2 justify-center items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <p className="p-bold-16">Anywhere</p>
          <div className="h-8 border border-l border-gray-300"></div>
          <p className="p-bold-16">Any week</p>
          <div className="h-8 border-l border-gray-300"></div>
          <p className="text-muted-foreground">Add guests</p>
          <Button
            className="rounded-full bg-primary text-white"
            variant={"default"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
        </div>
        <UserNav />
      </nav>
    </header>
  );
}

export default Header;
