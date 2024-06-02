"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import axios from "axios";

export async function createHotelRoom(userId: string, session: any) {
  console.log("Creating hotel room for user:", session?.user.id as string);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/latest`,
    {
      params: {
        id: userId,
      },
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    },
  );
  const result = res.data;
  console.log("Result from createHotelRoom:", result);
  if (result === "" || result === null) {
    const { data: newHotel } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/create`,
      {
        userId: userId,
        hotelRoom: {},
      },
    );
    console.log("Data from createHotelRoom:", newHotel);
    return redirect(`/create/${newHotel.hotelId}/structure`);
  } else if (
    !result.addedCategory &&
    !result.addedDescription &&
    !result.addedLocation
  ) {
    return redirect(`/create/${result.hotelId}/structure`);
  } else if (result.addedCategory && !result.addedDescription) {
    return redirect(`/create/${result.hotelId}/description`);
  } else if (
    result.addedCategory &&
    result.addedDescription &&
    !result.addedLocation
  ) {
    return redirect(`/create/${result.hotelId}/address`);
  } else if (
    result.addedCategory &&
    result.addedDescription &&
    result.addedLocation
  ) {
    const { data: newHotel } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/create`,
      {
        userId,
        hotelRoom: {},
      },
    );
    return redirect(`/create/${newHotel.hotelId}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("type") as string;
  const hotelId = formData.get("hotelId") as string;
  const userId = formData.get("userId") as string;

  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/update`, {
    userId: userId,
    hotelRoom: {
      hotelId: hotelId,
      addedCategory: true,
      type: categoryName,
      userId: userId,
    },
  });
  return redirect(`/create/${hotelId}/description`);
}

export async function createDescription(formData: FormData) {
  console.log("Creating description for hotel room::: ", formData);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const coverImageUrl = formData.get("imageUrl") as string;
  const hotelId = formData.get("hotelId") as string;
  const userId = formData.get("userId") as string;
  const specialNote = formData.get("specialNote") as string;

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomsNumber = formData.get("bathroom") as string;

  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/update`, {
    userId: userId,
    hotelRoom: {
      name: title,
      description: description,
      price: price,
      numOfBedrooms: roomNumber,
      numOfBathrooms: bathroomsNumber,
      numOfGuests: guestNumber,
      coverImage: coverImageUrl,
      addedDescription: true,
      addedCategory: true,
      specialNote: specialNote,
      hotelId: hotelId,
      userId: userId,
    },
  });
  return redirect(`/create/${hotelId}/address`);
}

export async function createLocation(formData: FormData) {
  const hotelId = formData.get("hotelId") as string;
  const countryValue = formData.get("countryValue") as string;
  const userId = formData.get("userId") as string;

  const data = axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/update`,
    {
      userId: userId,
      hotelRoom: {
        addedLocation: true,
        addedDescription: true,
        addedCategory: true,
        location: countryValue,
        hotelId: hotelId,
        userId: userId,
      },
    },
  );
  return redirect("/");
}

export async function addToFavorite(formData: FormData) {
  const hotelId = formData.get("hotelId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/favorite/create`,
    {
      userId: userId,
      hotelId: hotelId,
    },
  );
  revalidatePath(pathName);
}

export async function DeleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathName") as string;
  const userId = formData.get("userId") as string;

  const data = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/favorite/delete`,
    {
      data: {
        favoriteId: favoriteId,
        userId: userId,
      },
    },
  );
  revalidatePath(pathName);
  return !!data.data;
}
