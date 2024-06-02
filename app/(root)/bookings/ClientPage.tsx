"use client";
import { NoItems } from "@/components/NoItem";
import ListingBooking from "@/components/ListingBooking";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// @ts-ignore
export default function ClientPage({ bookings, currentUser }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/${id}/delete`)
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

  console.log("BOOKING", bookings);

  return (
    <section className="wrapper container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Bookings</h2>
      {bookings?.length === 0 ? (
        <NoItems
          title="Hey you dont have any Bookings"
          description="Please add a booking to see it right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {bookings?.map((item: any) => (
            <ListingBooking
              key={item.id}
              data={item?.hotelRoom}
              booking={item}
              actionId={item?.id}
              onAction={onCancel}
              disabled={item?.user?.id === item?.hotelRoom.userId}
              actionLabel={"Cancel guest booking"}
              currentUser={currentUser?.user}
            />
          ))}
        </div>
      )}
    </section>
  );
}
