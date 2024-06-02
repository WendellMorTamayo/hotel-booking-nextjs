import { NoItems } from "@/components/NoItem";
import { getSession } from "@/pages/api/auth/auth";
import { redirect } from "next/navigation";
import { getData } from "@/app/(root)/favorites/action";
import ListingCard from "@/components/ListingCard";

export default async function FavoriteRoute() {
  const session = await getSession();
  if (!session?.user.id) return redirect("/");

  const data = await getData(session?.user.id);
  return (
    <section className="wrapper container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {data?.length === 0 ? (
        <NoItems
          title="Hey you dont have any favorites"
          description="Please add favorites to see them right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item: any) => (
            <ListingCard
              key={item.hotelFavorites?.id}
              description={item.hotelFavorites?.description as string}
              location={item.hotelFavorites?.location as string}
              pathName="/favorites"
              hotelId={item.hotelFavorites?.id as string}
              imagePath={item.hotelFavorites?.coverImage as string}
              price={item.hotelFavorites?.price as number}
              userId={session.user.id}
              favoriteId={
                item.hotelFavorites?.checkFavorite.favoriteId as string
              }
              isFavoriteByUser={item.hotelFavorites?.checkFavorite.favorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
