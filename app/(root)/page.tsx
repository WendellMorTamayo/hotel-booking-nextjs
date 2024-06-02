import React from "react";
import { SkeletonCard } from "@/components/SkeletonCard";
import { getSession } from "@/pages/api/auth/auth";
import { MapFilterItems } from "@/components/MapFilterItems";
import { Suspense, use } from "react";
import { ShowItems } from "@/components/ShowItems";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    type?: string;
    location?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const serverSession = await getSession();
  console.log({ serverSession });

  return (
    <section className="wrapper mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={searchParams?.type} fallback={<SkeletonLoading />}>
        <ShowItems
          searchParams={searchParams}
          userId={serverSession?.user.id}
        />
      </Suspense>
    </section>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
