import { NoItems } from "@/components/NoItem";
import { getData } from "@/app/(root)/action";
import ListingCard from "@/components/ListingCard";
import { getSession } from "@/pages/api/auth/auth";

export async function ShowItems({
  searchParams,
  userId,
}: {
  searchParams?: {
    type?: string;
    location?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
  userId?: string;
}) {
  const data = await getData({ searchParams: searchParams, userId: userId });
  const session = await getSession();
  console.log("Data:::", data);
  return (
    <>
      {data.length === 0 ? (
        <NoItems
          description="Please check other category or create your own listing!"
          title="Sorry no listings found for this category..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item: any) => (
            <ListingCard
              key={item.hotelRoom.hotelId}
              description={item.hotelRoom.description as string}
              imagePath={item.hotelRoom.coverImage as string}
              location={item.hotelRoom.location as string}
              price={item.hotelRoom.price as number}
              userId={session?.user.id}
              favoriteId={item.checkFavorite?.favoriteId}
              isFavoriteByUser={item.checkFavorite?.favorite}
              hotelId={item.hotelRoom.hotelId}
              pathName="/"
              ownerId={item.user.userId}
            />
          ))}
        </div>
      )}
    </>
  );
}
