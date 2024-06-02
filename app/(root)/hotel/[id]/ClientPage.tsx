"use client";

import { differenceInDays, eachDayOfInterval } from "date-fns";

import { Range } from "react-date-range";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/(root)/bookings/actions";
import ListingHotel from "@/components/ListingHotel";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  hotelRoom?: any;
  bookings: any & {
    user: any;
  };
  currentUser?: any | null;
}

const ClientPage: React.FC<ListingClientProps> = ({
  hotelRoom,
  bookings = [],
  currentUser,
}) => {
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(hotelRoom?.price);

  const router = useRouter();
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && hotelRoom?.price) {
        setTotalPrice(dayCount * hotelRoom?.price);
      } else {
        setTotalPrice(hotelRoom?.price);
      }
    }
  }, [dateRange, hotelRoom?.price]);

  const disabledDates = useMemo(() => {
    if (!bookings) return [];
    let dates: Date[] = [];

    bookings?.forEach((booking: any) => {
      if (booking.status === "cancelled") return;
      const range = eachDayOfInterval({
        start: new Date(booking.checkInDate),
        end: new Date(booking.checkOutDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [bookings]);

  const onCreateBooking = useCallback(async () => {
    if (!currentUser) {
      return router.push("/signin");
    }
    setIsLoading(true);
    try {
      const data = await createBooking(
        currentUser?.id,
        totalPrice,
        hotelRoom.hotelId,
        dateRange.startDate,
        dateRange.endDate,
        hotelRoom?.name,
        hotelRoom?.description,
        hotelRoom?.coverImage,
      );
      router.push(data.url);
      toast.success("Booking created successfully.");
      setDateRange(initialDateRange);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.", totalPrice);
    } finally {
      setIsLoading(false);
    }
  }, [totalPrice, dateRange, hotelRoom?.id, router, currentUser]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && hotelRoom?.price) {
        setTotalPrice(dayCount * hotelRoom?.price);
      } else {
        setTotalPrice(hotelRoom?.price);
      }
    }
  }, [dateRange, hotelRoom?.price]);

  return (
    <div
      className={
        "max-w-screen-2xl mx-auto h-full flex flex-col justify-center items-center"
      }
    >
      <ListingHotel
        price={hotelRoom?.price}
        totalPrice={totalPrice}
        onChangeDate={(value) => setDateRange(value)}
        dateRange={dateRange}
        onSubmit={onCreateBooking}
        disabled={isLoading}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default ClientPage;
