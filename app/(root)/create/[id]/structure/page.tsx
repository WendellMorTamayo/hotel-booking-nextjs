
import { CreationBottomBar } from "@/components/CreationBottomBar";
import SelectCategory from "@/components/SelectedCategory";
import { createCategoryPage } from "@/lib/actions";

export default function StructureRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="hotelId" value={params.id} />
        <SelectCategory />
        <CreationBottomBar />
      </form>
    </>
  );
}
