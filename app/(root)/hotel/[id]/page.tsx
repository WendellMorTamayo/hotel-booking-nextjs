import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useCountries } from "@/lib/getCountries";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { HomeMap } from "@/components/HomeMap";
import { getBookingsByHotel, getData } from "@/app/(root)/hotel/actions";
import { getSession } from "@/pages/api/auth/auth";
import ClientPage from "@/app/(root)/hotel/[id]/ClientPage";
import { redirect } from "next/navigation";

export default async function HotelRoute({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const data = await getData(params.id, session?.user.id as string);

  const hotelRoom = data?.hotelRoom;
  const owner = data?.user;
  const bookings = await getBookingsByHotel(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(hotelRoom.location as string);

  return (
    <div className="container mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of Home"
          src={hotelRoom?.coverImage}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>
      <div className={"flex flex-col gap-6 justify-center align-middle"}>
        <div className="flex gap-x-4 mt-8">
          <div className="w-2/3">
            <h3 className="text-xl font-medium">
              {country?.flag} {country?.label} / {country?.region}
            </h3>
            <div className="flex gap-x-2 text-muted-foreground">
              <p>{hotelRoom?.numOfGuests} Guests</p> *{" "}
              <p>{hotelRoom?.numOfBedrooms} Bedrooms</p> *{" "}
              {hotelRoom?.numOfBathrooms} Bathrooms
            </div>

            <div className="flex items-center mt-6">
              <img
                src={
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="User Profile"
                className="w-11 h-11 rounded-full"
              />
              <div className="flex flex-col ml-4">
                <h3 className="font-medium">Hosted by {owner.firstname}</h3>
                <p className="text-sm text-muted-foreground">Host since 2024</p>
              </div>
            </div>

            <Separator className="my-7" />

            <CategoryShowcase categoryName={hotelRoom?.type as string} />

            <Separator className="my-7" />

            <p className="text-muted-foreground">{hotelRoom?.description}</p>

            <Separator className="my-7" />

            <HomeMap locationValue={country?.value as string} />
          </div>

          <div className={"flex-grow justify-center items-center"}>
            <div className={"w-full"}>
              <ClientPage
                bookings={bookings}
                hotelRoom={hotelRoom}
                currentUser={session?.user}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
