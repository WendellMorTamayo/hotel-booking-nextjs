import Image from "next/image";
import { categoryItems, iAppProps } from "../lib/categoryItems";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function CategoryShowcase({
  categoryItems,
}: {
  categoryItems: iAppProps[];
}) {
  // const category = categoryItems.find((item) => item.name === categoryName);

  return (
    <ScrollArea className="flex-col container whitespace-nowrap rounded-md border-none m-o items-center justify-center">
      <div className="flex">
        {categoryItems.map((item) => (
          <div
            key={item.id}
            className="flex w-max space-x-4 p-4 items-center justify-center"
          >
            <Image
              src={item?.imageUrl}
              alt="Category image"
              width={44}
              height={44}
            />
            <h3 className="font-medium">{item?.title}</h3>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
