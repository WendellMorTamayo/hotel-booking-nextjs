import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
import axios from "axios";

export async function getData(hotelId: string, userId: string) {
  noStore();
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/${hotelId}`,
    {
      params: {
        hotelId: hotelId,
        userId: userId,
      },
    },
  );
  return data.data;
}

export async function getBookingsByHotel(hotelId: string) {
  noStore();
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/booking/hotel`,
    {
      params: {
        hotelId: hotelId,
      },
    },
  );
  return data.data;
}
