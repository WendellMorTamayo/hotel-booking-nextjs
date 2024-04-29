import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { formatPrice } from "@/lib/utils";
import { AddToFavoriteButton } from "./SubmitButton";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
}

function ListingCard({ imagePath, description, location, price }: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <>
      <div className="flex-col flex">
        <div className="flex flex-col relative h-72">
          <Image
            src={imagePath}
            alt={"Image of a house"}
            fill
            className="rounded-lg h-full object-cover mb-3"
          />
          <div className="z-10 absolute top-2 right-2">
            <AddToFavoriteButton />
          </div>
        </div>
        <Link href="/" className="mt-2">
          <div className="flex-between">
            <p className="font-semibold">{location}</p>
            <div className="flex flex-row justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-black">5.0</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
          <p className="pt-2 text-muted-foreground">
            <span className="font-semibold text-black">
              ₱{formatPrice(price)}
            </span>{" "}
            Night
          </p>
        </Link>
      </div>
    </>
  );
}

export default ListingCard;
