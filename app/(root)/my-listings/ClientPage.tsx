"use client";

import { useRouter } from "next/navigation";
import { NoItems } from "@/components/NoItem";
import ListingCard from "@/components/ListingCard";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

// @ts-ignore
export default function ClientPage({ data, currentUser }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);
      console.log("id", id);
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/delete?id=${id}`)
        .then(() => {
          toast.success("Booking cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router],
  );
  return (
    <section className="wrapper container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

      {data.length === 0 ? (
        <NoItems
          description="Please list a hoeme on airbnb so that you can see it right here"
          title="Your dont have any Homes listed"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item: any) => (
            <ListingCard
              key={item.hotelId}
              imagePath={item.coverImage as string}
              hotelId={item.hotelId}
              price={item.price as number}
              description={item.description as string}
              location={item.location as string}
              userId={undefined}
              pathName="/my-listings"
              favoriteId={item.favoriteId as string}
              isFavoriteByUser={false}
              actionId={item.hotelId}
              onAction={onDelete}
              disabled={deletingId === item.hotelId}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </section>
  );
}
