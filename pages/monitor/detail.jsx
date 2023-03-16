import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MainLayOut, BillingActionDetailTable } from "@/components";
import { Avatar, Input, Badge } from "@nextui-org/react";
import { RandomTotalStatus, RandomName } from "@/hooks";
import { useEffect } from "react";

const BillingMonitorDetailPage = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [totalOpen, setTotalOpen] = useState(0);
  const [totalProcess, setTotalProcess] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [totalReject, setTotalReject] = useState(0);

  useEffect(() => {
    let n = RandomName();
    setFullName(n);
    let p = RandomTotalStatus();
    setTotalOpen(p[0]);
    setTotalProcess(p[1]);
    setTotalApprove(p[2]);
    setTotalReject(p[3]);
  }, []);
  return (
    <>
      <MainLayOut
        title={`${router.query["id"]} Detail`}
        description="Show Billing Detail"
      >
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/monitor`}>Billing Monitor</Link>
          </span>
          <span className="text-4xm font-bold">/</span>
          <span className="text-4xm text-gray-500">
            {router.query["action"]}
          </span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between space-x-2">
            <div className="flex justify-start w-fit">
              <div className="justify-center bg-white rounded-lg">
                <div className="grid justify-center items-center m-10">
                  <div className="flex justify-center">
                    <Avatar src="/emp.png" css={{ size: "$20" }} />
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
                  <div className="mt-4 grid grid-rows-1">
                    <>
                      <span className="text-4xm text-bold">Billing No.</span>
                    </>
                    <>
                      <div className="text-gray-600 bg-gray-200 rounded p-2 w-auto">
                        {router.query["id"]}
                      </div>
                    </>
                  </div>
                  <div className="mt-4 grid">
                    <>
                      <span className="text-4xm text-bold">Billing Total</span>
                    </>
                    <div className="flex items-center justify-between text-center space-x-4 mt-4">
                      <>
                        <div className="grid grid-rows-2 rounded-lg bg-gray-100 p-2 shadow">
                          <span className="text-xs">
                            {totalOpen.toLocaleString()}
                          </span>
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
                      <span className="text-4xm text-bold">Detail</span>
                    </>
                    <Badge color="secondary" variant="bordered">
                      Vendor
                    </Badge>
                  </div>
                  <div className="mt-4 grid grid-rows-1">
                    <>
                      <span className="text-4xm text-bold">Username</span>
                    </>
                    <>
                      <span className="text-xs">USER-XXXXXX</span>
                    </>
                  </div>
                  <div className="mt-4 grid grid-rows-1">
                    <>
                      <span className="text-4xm text-bold">E-Mail</span>
                    </>
                    <>
                      <span className="text-xs">E-Mail Address</span>
                    </>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bg-white rounded-lg p-4 w-full">
              <BillingActionDetailTable />
            </div>
          </div>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingMonitorDetailPage;
