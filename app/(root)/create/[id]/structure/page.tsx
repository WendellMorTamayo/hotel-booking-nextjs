"use client";

import { CreationBottomBar } from "@/components/CreationBottomBar";
import SelectCategory from "@/components/SelectedCategory";
import { createCategoryPage } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function StructureRoute({ params }: { params: { id: string } }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return redirect("/signin");
    },
  });

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="hotelId" value={params.id} />
        <input type="hidden" name="userId" value={session?.user.id} />
        <SelectCategory />
        <CreationBottomBar />
      </form>
    </>
  );
}
