/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MainLayOut,
  BillingActionDetailTable,
  AvatarDetail,
} from "@/components";
import { Avatar, Input, Badge } from "@nextui-org/react";
import { RandomTotalStatus, RandomName } from "@/hooks";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const BillingMonitorDetailPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [billing, setBilling] = useState({});
  const [fullName, setFullName] = useState("");
  const [totalOpen, setTotalOpen] = useState(0);
  const [totalProcess, setTotalProcess] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [totalReject, setTotalReject] = useState(0);

  const fetchData = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/list?id=${id}`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      console.dir(data.data);
      setBilling(data.data);
      // setTotalOpen(data.totalOpen);
      // setTotalProcess(data.totalProcess);
      // setTotalApprove(data.totalApprove);
      // setTotalReject(data.totalReject);
    }
  };

  useEffect(() => {
    if (session) {
      // let n = RandomName();
      // setFullName(n);
      // let p = RandomTotalStatus();
      // setTotalOpen(p[0]);
      // setTotalProcess(p[1]);
      // setTotalApprove(p[2]);
      // setTotalReject(p[3]);
      let id = router.query["id"];
      fetchData(id);
    }
  }, [session]);
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
              <AvatarDetail
                isShowBilling={true}
                billing={billing}
                user={session?.user}
              />
            </div>
            <div className=" bg-white rounded-lg p-4 w-full">
              <BillingActionDetailTable documents={billing?.document_list} />
            </div>
          </div>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingMonitorDetailPage;
