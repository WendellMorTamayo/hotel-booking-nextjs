
import { NoItems } from "@/components/NoItem";


export default async function FavoriteRoute() {

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

        <NoItems
          title="Hey you dont have any favorites"
          description="Please add favorites to see them right here..."
        />
    
    </section>
  );
}
