"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div
      className={
        "flex justify-center mt-40 h-auto w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center"
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-start items-center">
          <Button variant={"link"} onClick={() => router.replace("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className="font-bold">Back</span>
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
