import {
  AvatarDetail,
  MainLayOut,
  RequiredDocuments,
  StepTimeLine,
} from "@/components";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

const fileType = [
  "1.Purchase Order",
  "2.Tax Invoice/Delivery Order",
  "3.Receipt",
  "4.Bill",
];

const OverdueBillingDetailPage = () => {
  const router = useRouter();
  const [statusTitle, setStatusTitle] = useState("")

  useEffect(() => {
    setStatusTitle(router.query["status"])
  }, [router])

  return (
    <>
      <MainLayOut title={`Overdue Billing Detail`}>
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/overdue`}>Overdue Billing</Link>
          </span>
          <span className="text-4xm font-bold">/</span>
          <span className="text-4xm text-gray-500">
            {statusTitle}
          </span>
        </div>
        <div className="flex justify-between mt-4 space-x-4">
          <div className="flex justify-start w-fit rounded shadow bg-white">
            <AvatarDetail isShowBilling={true} />
          </div>
          <div className="w-full">
            <div className="grid rounded shadow p-4 bg-white">
              <span className="text-4xm">Status</span>
              <StepTimeLine isComplete={false} />
            </div>
            <RequiredDocuments fileType={fileType}/>
          </div>
        </div>
      </MainLayOut>
    </>
  );
};

export default OverdueBillingDetailPage;
