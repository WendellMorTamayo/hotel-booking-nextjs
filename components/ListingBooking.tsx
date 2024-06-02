"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useCountries } from "@/lib/getCountries";
import CustomBtn from "@/components/CustomBtn";

interface ListingCardProps {
  data: any;
  booking?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any | null;
}

const ListingBooking: React.FC<ListingCardProps> = ({
  data,
  booking,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(data?.location as string);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId],
  );

  const price = useMemo(() => {
    if (booking) {
      return booking?.paymentHistory?.amount;
    }
    return data?.price;
  }, [booking, data?.price]);

  const reservationDate = useMemo(() => {
    if (!booking) {
      return null;
    }

    const start = new Date(booking.checkInDate);
    const end = new Date(booking.checkOutDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [booking]);

  return (
    <div
      onClick={() => router.push(`/hotel/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            "
            src={data?.coverImage}
            alt="Listing"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            {/*<HeartButton listingId={data.id} currentUser={currentUser} />*/}
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!booking && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <CustomBtn
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingBooking;
