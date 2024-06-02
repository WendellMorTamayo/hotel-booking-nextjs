"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import EventForm from "@/components/EventForm";

export default function DescriptionPage({
  params,
}: {
  params: { id: string };
}) {
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
          Please describe your home as good as you can!
        </h2>
      </div>
      <input type="hidden" name="hotelId" value={params.id} />
      <EventForm
        userId={session?.user.id as string}
        hotelId={params.id as string}
      />
    </>
  );
}
