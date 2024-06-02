"use client";

import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButton";
import { addToFavorite, DeleteFromFavorite } from "@/lib/actions";
import CustomBtn from "@/components/CustomBtn";
import React, { useCallback } from "react";

interface iAppProps {
  imagePath?: string;
  description?: string;
  location?: string;
  price?: number;
  userId?: string | undefined;
  isFavoriteByUser?: boolean;
  favoriteId?: string;
  hotelId?: string;
  pathName?: string;
  ownerId?: string;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any;
}

function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  hotelId,
  favoriteId,
  isFavoriteByUser,
  pathName,
  ownerId,
  onAction,
  disabled,
  actionLabel,
  actionId,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location as string);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId as string);
    },
    [disabled, onAction, actionId],
  );
  return (
    <>
      <div className="flex flex-col col-span-1 cursor-pointer group">
        <div className="relative h-72">
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
              src={imagePath as string}
              alt="Image of House"
              fill
              className="object-cover
              h-full
              w-full
              group-hover:scale-110
              transition"
            />
          </div>
          {userId !== ownerId && userId && (
            <div className="z-10 absolute top-2 right-2">
              {isFavoriteByUser ? (
                <form action={DeleteFromFavorite}>
                  <input type="hidden" name="favoriteId" value={favoriteId} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <DeleteFromFavoriteButton />
                </form>
              ) : (
                <form action={addToFavorite}>
                  <input type="hidden" name="hotelId" value={hotelId} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <AddToFavoriteButton />
                </form>
              )}
            </div>
          )}
        </div>

        <Link href={`/hotel/${hotelId}`} className="mt-2">
          <h3 className="font-medium text-base">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
          <p className="pt-2 text-muted-foreground">
            <span className="font-medium text-black">₱ {price}</span> Night
          </p>
        </Link>
        {onAction && actionLabel && (
          <CustomBtn
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </>
  );
}

export default ListingCard;
