/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarDetail,
  BillingActionDetailTable,
  MainLayOut,
} from "@/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BillingMonitorDetailPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [billing, setBilling] = useState({});
  const [documentList, setDocumentList] = useState([]);

  const fetchData = async () => {
    let id = router.query["id"];
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
    }
  };

  const fetchDocumentListData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/document/list`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      console.dir(data.data);
      setDocumentList(data.data);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
      fetchDocumentListData();
    }
  }, [session, router]);
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
              <BillingActionDetailTable
                billing_id={billing?.id}
                documents={billing?.document_list}
                token={session?.user.accessToken}
                documentList={documentList}
                reloadData={() =>
                  session?.user.isAdmin
                    ? router.push("/monitor")
                    : router.push("/overdue")
                }
              />
            </div>
          </div>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingMonitorDetailPage;
