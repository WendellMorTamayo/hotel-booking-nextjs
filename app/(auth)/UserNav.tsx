/* eslint-disable react/jsx-no-comment-textnodes */

import { signIn, signOut, useSession } from "next-auth/react";
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
import { HotelRoomDTO, HotelRoomRequestDTO } from "../(root)/create/types";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { createHotelRoom } from "@/lib/actions";

export function UserNav() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
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
    try {
        const userId = session?.user.user.id;
      const res = await createHotelRoom(userId as number, session);
    } catch (error) {
      console.error("Error creating hotel room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createHotelRoomWithId = async () => {
    setIsLoading(true);
    if (session) {
      // const hotelRoom: HotelRoomDTO = {
      //   roomImages: [
      //     "https://a0.muscache.com/im/pictures/miso/Hosting-22774851/original/7789a5cc-f7cb-4238-ad5d-f1d71e36365c.jpeg?im_w=1200",
      //     "https://a0.muscache.com/im/pictures/miso/Hosting-22774851/original/69ce39d3-c285-494a-a0a4-36834c5642fc.jpeg?im_w=1200",
      //     "https://a0.muscache.com/im/pictures/miso/Hosting-22774851/original/8dcd8fb9-14f5-4e30-93e5-704cdbad8c9d.jpeg?im_w=720",
      //   ],
      //   name: "Hotel Room",
      //   location: "New York",
      //   description: "A beautiful hotel room in New York",
      //   contact: "1234567890",
      //   email: "contact@mail.com",
      //   specialNote: "No smoking",
      //   price: 100,
      //   isBooked: false,
      //   type: "Single",
      //   dimension: "10x10",
      //   numberOfBeds: 1,
      //   offeredAmenities: [
      //     { amenity: "TV", icon: "tv" },
      //     { amenity: "AC", icon: "ac" },
      //     { amenity: "Wifi", icon: "wifi" },
      //   ],
      //   slug: "hotel-room",
      //   coverImage:
      //     "https://a0.muscache.com/im/pictures/miso/Hosting-22774851/original/7789a5cc-f7cb-4238-ad5d-f1d71e36365c.jpeg?im_w=1200",
      // };

      // const requestDTO: HotelRoomRequestDTO = {
      //   userId: session.user.user.id,
      //   {},
      // };
      // console.log("Request:: ", requestDTO);
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/create`,
          {
            userId: session.user.user.id,
            hotelRoom: {},
          }
        );
      } catch (error) {
        console.error("Error creating hotel room:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      await signIn("credentials", {
        redirect: false,
      });
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
                <button type="submit" className="w-full">
                  Airbnb your Home
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-homes" className="w-full">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/favorites" className="w-full">
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/reservations" className="w-full">
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
