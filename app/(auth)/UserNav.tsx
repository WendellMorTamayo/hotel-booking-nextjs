/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, MenuIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { createHotelRoom } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function UserNav() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  console.log("The session:: ", { session });

  const handleLogout = async () => {
    setIsLoading(true);
    if (session) {
      const accessToken = session?.user.access_token;
      console.log(session.user);
      try {
        await axios.post("/api/auth/logout", {
          accessToken: accessToken,
        });
        await signOut({ callbackUrl: "/", redirect: false });
        router.push("/");
        toast.warning("Successfully logged out", {
          duration: 3000,
          description: "You have been successfully signed out",
          position: "top-center",
        });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    console.log("The::", session?.user.id);
    try {
      const userId = session?.user.id as string;
      await createHotelRoom(userId, session);
    } catch (error) {
      console.error("Error creating hotel room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <Image
            src={"/assets/images/default-avatar.jpg"}
            alt="Image of the user"
            className="rounded-full h-8 w-8 hidden lg:block"
            width={32}
            height={32}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] text-center">
        {!session?.user ? (
          <>
            <DropdownMenuItem className="">
              <Link href={"/signup"}>Register</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/signin"}>Login</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <form action={handleCreate} className="w-full">
                <Button type="submit" className="w-full">
                  Create Listing
                </Button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-listings" className="w-full">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/favorites" className="w-full">
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/bookings" className="w-full">
                My Bookings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/"
                className="w-full font-bold"
                onClick={handleLogout}
              >
                {isLoading ? (
                  <span className="w-full font-bold flex items-center justify-center">
                    <LoadingSpinner />
                    Logout
                  </span>
                ) : (
                  "Logout"
                )}
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
