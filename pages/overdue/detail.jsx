/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarDetail,
  MainLayOut,
  RequiredDocuments,
  StepTimeLine,
} from "@/components";
import { Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const OverdueBillingDetailPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [statusTitle, setStatusTitle] = useState("");
  const [billing, setBilling] = useState({});
  const [documentList, setDocumentList] = useState([]);
  const [stepData, setStepData] = useState([]);

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
    }
  };

  const fetchDocumentList = async () => {
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
      setDocumentList(data.data);
    }
  };

  const reload = () => {
    fetchData(router.query["id"]);
  };

  const fetchStep = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(`${process.env.API_HOST}/step`, requestOptions);
    if (res.ok) {
      const data = await res.json();
      setStepData(data.data);
    }
  };

  useEffect(() => {
    setStatusTitle(router.query["status"]);
    if (session) {
      reload();
      fetchDocumentList();
      fetchStep();
    }
  }, [router, session]);

  return (
    <>
      <MainLayOut title={`Overdue Billing Detail`}>
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/overdue`}>Overdue Billing</Link>
          </span>
          <span className="text-4xm font-bold">/</span>
          <span className="text-4xm text-gray-500">
            Billing status {statusTitle}
          </span>
        </div>
        <div className="flex justify-between mt-4 space-x-4">
          <div className="flex justify-start w-fit rounded shadow bg-white">
            <AvatarDetail
              isShowBilling={true}
              billing={billing}
              user={session?.user}
            />
          </div>
          <div className="w-full">
            <div className="grid rounded shadow p-4 bg-white">
              <span className="text-4xm">Status</span>
              <StepTimeLine
                data={stepData}
                stepComplete={billing?.billing_step}
              />
            </div>
            {statusTitle === "Approved" ? (
              <div className="grid rounded shadow p-4 bg-white mt-4 mb-4">
                <span className="text-4xm">Detail</span>
                <Textarea fullWidth placeholder="Enter Detail" />
              </div>
            ) : null}
            <RequiredDocuments
              billing_id={billing.id}
              fileType={documentList}
              status={statusTitle}
              docs={billing.document_list}
              token={session?.user.accessToken}
              reloadData={reload}
            />
          </div>
        </div>
      </MainLayOut>
    </>
  );
};

export default OverdueBillingDetailPage;
