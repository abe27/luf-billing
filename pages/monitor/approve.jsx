/* eslint-disable react-hooks/exhaustive-deps */
import { AvatarDetail, MainLayOut, StepTimeLine } from "@/components";
import { DateString } from "@/hooks";
import { Row, Spacer, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BillingApprovePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [billing, setBilling] = useState([]);
  const [stepData, setStepData] = useState([]);
  const [paymentDate, setPaymentDate] = useState(null);
  const [comment, setComment] = useState(null);

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
      setComment(data.data.detail);
      setBilling(data.data);
      console.dir(data.data);
    }
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
    if (session) {
      fetchStep();
      fetchData();
    }
  }, [session, router]);
  return (
    <>
      <MainLayOut
        title={`${router.query["id"]} detail`}
        description="Show Billing Approve Detail"
      >
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/monitor`}>Billing Monitor</Link>
          </span>
          <span className="text-4xm font-bold">/</span>
          <span className="text-4xm text-gray-500">Approved</span>
        </div>
        <div className="mt-4 flex justify-between space-x-2">
          <div className="flex justify-start w-fit">
            <AvatarDetail
              isShowBilling={true}
              billing={billing}
              user={session?.user}
            />
          </div>
          <div className="p-4 w-full">
            <div className="bg-white rounded p-4">
              <span className="text-4xm text-bold">Status</span>
              <>
                <StepTimeLine step={billing?.status} data={stepData} />
              </>
            </div>
            <div className="bg-white rounded p-4 mt-4 grid">
              <div className="mb-2">
                <span className="text-4xm text-bold">Payment due date</span>
              </div>
              <Row>
                <span className="text-sm bg-gray-100 p-2 w-full rounded shadow">
                  {DateString(billing?.payment_date)}
                </span>
              </Row>
              <Spacer y={1} />
              <Row>
                <Textarea
                  readOnly
                  label="Comment"
                  placeholder="Enter your comment here"
                  fullWidth={true}
                  value={comment}
                />
              </Row>
            </div>
            <div className="bg-white rounded p-4 mt-4 grid">
              <>
                <span className="text-4xm text-bold">Required Documents</span>
              </>
              <div className="mt-4">
                {billing?.document_list?.map((i, index) => (
                  <div key={index}>
                    {/* <Input readOnly fullWidth label={i.label} /> */}
                    <div>
                      <span className="text-4xm text-bold">
                        {i.document.title}
                        <span className="text-rose-500">*</span>
                      </span>
                    </div>
                    <Row>
                      <div className="flex justify-between w-full rounded bg-gray-100 p-2">
                        <div className="flex justify-start">
                          <span className="text-4xm text-bold">
                            {i.file_name}
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <span className="text-4xm text-bold">
                            {i.file_size.toLocaleString()}kb
                          </span>
                        </div>
                      </div>
                    </Row>
                    <Spacer y={1} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingApprovePage;
