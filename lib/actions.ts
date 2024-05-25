"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { HotelRoomRequestDTO } from "@/app/(root)/create/types";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

export async function createHotelRoom(userId: number, session: any) {
    console.log("Creating hotel room for user:", session?.user.access_token);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/latest`,
      {
        params: {
          id: userId,
        },
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      }
    );
    const result = res.data;
    console.log("Data from createHotelRoom:", result);
    if (result === null) {
      const { data: newHotel } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/create`,
        {
          userId: userId,
          hotelRoom: {},
        },
      );
      return redirect(`/create/${newHotel.hotelId}/structure`);
    } else if (
      !result.addedCategory &&
      !result.addedDescription &&
      !result.addedLoaction
    ) {
      return redirect(`/create/${result.hotelId}/structure`);
    } else if (result.addedCategory && !result.addedDescription) {
      return redirect(`/create/${result.hotelId}/description`);
    } else if (
      result.addedCategory &&
      result.addedDescription &&
      !result.addedLoaction
    ) {
      return redirect(`/create/${result.hotelId}/address`);
    } else if (
      result.addedCategory &&
      result.addedDescription &&
      result.addedLoaction
    ) {

      const { data: newHotel } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/create`,
        {
          userId,
          hotelRoom: {},
        }
      );
      return redirect(`/create/${newHotel.hotelId}/structure`);
    }
}


export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const hotelId = formData.get("hotelId") as string;
  const res: any = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/${Number(hotelId)}`,
  );
  console.log("Hotel data from createCategoryPage:", res.data.userId);
  const data = res.data;
  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/update`, {
    userId: data.userId,
    hotelRoom: {
      hotelId: hotelId,
      addedCategory: true,
      type: categoryName,
      userId: data.userId,
    },
  });
  return redirect(`/create/${hotelId}/description`);
}