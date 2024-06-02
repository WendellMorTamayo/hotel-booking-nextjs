import { getSession } from "@/pages/api/auth/auth";
import { getData, updateBookingStatus } from "@/app/(root)/bookings/actions";
import ClientPage from "@/app/(root)/bookings/ClientPage";
import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";

export default async function BookingRoute() {
  const session = await getSession();
  if (!session?.user.id)
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );

  const data = await getData(session?.user.id);
  return <ClientPage bookings={data} currentUser={session?.user} />;
}
