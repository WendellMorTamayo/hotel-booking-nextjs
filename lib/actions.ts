"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import path from "path";

export async function createAirbnbHome({ userId }: { userId: string }) {
  //   const data = await home.findFirst({
  //     where: {
  //       userId: userId,
  //     },
  //     orderBy: {
  //       createdAT: "desc",
  //     },
  //   });
  const data = null; // TODO: Remove this line when the above code is uncommented

  if (data === null) {
    // const data = await home.create({
    //   data: {
    //     userId: userId,
    //   },
    // });

    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLoaction
  ) {
    // const data = await home.create({
    //   data: {
    //     userId: userId,
    //   },
    // });

    return redirect(`/create/${data.id}/structure`);
  }
}
