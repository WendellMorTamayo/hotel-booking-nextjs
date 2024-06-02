import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
import axios from "axios";

export async function getData(userId: string) {
  noStore();
  const res = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/user?id=${userId}`)
    .then((res) => res.data);
  return res;
}

export async function updateBookingStatus(bookingId: string) {
  noStore();
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/booking/update-status`,
    { bookingId: bookingId },
  );

  return res.data;
}

export async function createBooking(
  userId: string,
  totalPrice: number,
  hotelId: string,
  startDate: Date | undefined,
  endDate: Date | undefined,
  name: string,
  description: string,
  coverImage: string,
) {
  noStore();
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-checkout-session`,
    {
      hotelId: hotelId,
      totalPrice: totalPrice,
      name: name,
      description: description,
      coverImage: coverImage,
      startDate: startDate,
      endDate: endDate,
      userId: userId,
    },
  );
  return res.data;
}
