import { db } from "@/lib/db";
import { BillboardClient } from "./_components/client";
import { BillboardColumn } from "./_components/Columns";
import { format } from "date-fns";

const BillboardsPages = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billBoard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPages;
