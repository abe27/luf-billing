import { Avatar, Badge } from "@nextui-org/react";
import { useRouter } from "next/router";
import { RandomAmount, RandomDateString } from "@/hooks";
import { useEffect, useState } from "react";
const AvatarDetail = ({
  id = 1,
  isShowBilling = false,
  fullName = "First Last",
  totalOpen = 10,
  totalProcess = 20,
  totalApprove = 1,
  totalReject = 35,
}) => {
  const [billDate, setBillDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let b = RandomDateString();
    let d = RandomDateString();
    let a = RandomAmount();

    setBillDate(b);
    setDueDate(d);
    setAmount(a);
  }, []);
  return (
    <>
      <div className="justify-center bg-white rounded-lg">
        <div className="grid justify-center items-center mt-10">
          <div className="flex justify-center">
            <Avatar src="/emp.png" size={"xl"} css={{ size: "$20" }} />
          </div>
          <div className="text-center">
            <span className="text-4xm font-bold">{fullName}</span>
          </div>
          <div className="text-center">
            <span className="text-4xm text-gray-500">
              {process.env.APP_NAME}
            </span>
          </div>
        </div>
        <div className="p-4">
          {isShowBilling ? (
            <>
              <div className="mt-4 grid grid-rows-1">
                <>
                  <span className="text-sm text-bold">Billing No.</span>
                </>
                <>
                  <div className="text-gray-600 bg-gray-50 rounded p-2 w-auto text-sm">
                    {("00000000" + id).slice(-8)}
                  </div>
                </>
              </div>
              <div className="mt-4 grid grid-rows-1">
                <>
                  <span className="text-sm text-bold">Billing Date</span>
                </>
                <>
                  <div className="text-gray-600 bg-gray-50 rounded p-2 w-auto text-sm">
                    {billDate}
                  </div>
                </>
              </div>
              <div className="mt-4 grid grid-rows-1">
                <>
                  <span className="text-sm text-bold">Due Date</span>
                </>
                <>
                  <div className="text-gray-600 bg-gray-50 rounded p-2 w-auto text-sm">
                    {dueDate}
                  </div>
                </>
              </div>
              <div className="mt-4 grid grid-rows-1">
                <>
                  <span className="text-sm text-bold">Amount</span>
                </>
                <>
                  <div className="text-gray-600 bg-gray-50 rounded p-2 w-auto text-sm">
                    {amount.toLocaleString()}
                  </div>
                </>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="mt-4 grid">
            <>
              <span className="text-sm text-bold">Billing Total</span>
            </>
            <div className="flex items-center justify-between text-center space-x-4 mt-4">
              <>
                <div className="grid grid-rows-2 rounded-lg bg-gray-100 p-2 shadow">
                  <span className="text-xs">{totalOpen.toLocaleString()}</span>
                  <span className="text-xs">Open</span>
                </div>
              </>
              <div className="w-20">
                <div className="grid grid-rows-2 rounded-lg bg-gray-100 p-2 shadow">
                  <span className="text-xs">
                    {totalProcess.toLocaleString()}
                  </span>
                  <span className="text-xs">On Process</span>
                </div>
              </div>
              <>
                <div className="grid grid-rows-2 rounded-lg bg-gray-100 p-2 shadow">
                  <span className="text-xs">
                    {totalApprove.toLocaleString()}
                  </span>
                  <span className="text-xs">Approved</span>
                </div>
              </>
              <>
                <div className="grid grid-rows-2 rounded-lg bg-gray-100 p-2 shadow">
                  <span className="text-xs">
                    {totalReject.toLocaleString()}
                  </span>
                  <span className="text-xs">Rejected</span>
                </div>
              </>
            </div>
          </div>
          <div className="mt-4 grid grid-rows-1">
            <>
              <span className="text-sm text-bold">Detail</span>
            </>
            <Badge color="secondary" variant="bordered">
              Vendor
            </Badge>
          </div>
          <div className="mt-4 grid grid-rows-1">
            <>
              <span className="text-sm text-bold">Username</span>
            </>
            <>
              <span className="text-xs">USER-XXXXXX</span>
            </>
          </div>
          <div className="mt-4 grid grid-rows-1">
            <>
              <span className="text-sm text-bold">E-Mail</span>
            </>
            <>
              <span className="text-xs">E-Mail Address</span>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarDetail;
