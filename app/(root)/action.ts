import { unstable_noStore as noStore } from "next/cache";
import axios from "axios";

export async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    type?: string;
    location?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  noStore();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/search`,
    {
      params: {
        addedCategory: true,
        addedLocation: true,
        addedDescription: true,
        type: searchParams?.type ?? undefined,
        location: searchParams?.location ?? undefined,
        guests: searchParams?.guest ?? undefined,
        bedrooms: searchParams?.room ?? undefined,
        bathrooms: searchParams?.bathroom ?? undefined,
        userId: userId ?? undefined,
      },
    },
  );
  return response.data;
}
