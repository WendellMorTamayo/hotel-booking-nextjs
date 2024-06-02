import { unstable_noStore as noStore } from "next/cache";
import axios from "axios";

export async function getData(userId: string) {
  noStore();
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/user`,
    {
      params: {
        userId: userId,
      },
    },
  );
  return data.data;
}
