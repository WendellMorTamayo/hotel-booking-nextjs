import { unstable_noStore as noStore } from "next/cache";
import { getSession } from "@/pages/api/auth/auth";
import { redirect } from "next/navigation";
import { getData } from "@/app/(root)/my-listings/actions";
import { NoItems } from "@/components/NoItem";
import ListingCard from "@/components/ListingCard";
import ClientPage from "@/app/(root)/my-listings/ClientPage";

export default async function MyHomes() {
  const session = await getSession();
  if (!session?.user.id) return redirect("/");

  const data = await getData(session?.user.id);
  return <ClientPage data={data} currentUser={session?.user} />;
}
