import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MainLayOut, StepTimeLine } from "@/components";
import { Badge, Avatar, Row, Textarea, Input, Spacer } from "@nextui-org/react";
import { RandomName, RandomTotalStatus } from "@/hooks";

let doc = [
  {
    id: 0,
    label: "1.Purchase Order",
    filename: "PurchaseOrder.pdf",
    size: 100,
  },
  {
    id: 0,
    label: "2.Text Invoioce/Delivery Order",
    filename: "Invoice.pdf",
    size: 100,
  },
  { id: 0, label: "3.Receipt", filename: "Receipt.pdf", size: 100 },
  { id: 0, label: "4.Bill", filename: "bill.pdf", size: 100 },
];

const BillingApprovePage = () => {
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
            <div className="justify-center bg-white rounded-lg">
              <div className="grid justify-center items-center m-10">
                <Avatar
                  src="https://i.pravatar.cc/150"
                  css={{ size: "$150" }}
                />
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
          <div className="p-4 w-full">
            <div className="bg-white rounded p-4">
              <span className="text-4xm text-bold">Status</span>
              <>
                <StepTimeLine />
              </>
            </div>
            <div className="bg-white rounded p-4 mt-4 grid">
              <div className="mb-2">
                <span className="text-4xm text-bold">Payment due date</span>
              </div>
              <Row>
                <Input readOnly fullWidth type="date" />
              </Row>
              <Spacer y={1} />
              <Row>
                <Textarea
                  label="Comment"
                  placeholder="Enter your comment here"
                  fullWidth={true}
                />
              </Row>
            </div>
            <div className="bg-white rounded p-4 mt-4 grid">
              <>
                <span className="text-4xm text-bold">Required Documents</span>
              </>
              <div className="mt-4">
                {doc.map((i, index) => (
                  <div key={index}>
                    {/* <Input readOnly fullWidth label={i.label} /> */}
                    <div>
                      <span className="text-4xm text-bold">
                        {i.label}
                        <span className="text-rose-500">*</span>
                      </span>
                    </div>
                    <Row>
                      <div className="flex justify-between w-full rounded bg-gray-100 p-2">
                        <div className="flex justify-start">
                          <span className="text-4xm text-bold">
                            {i.filename}
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <span className="text-4xm text-bold">
                            {i.size.toLocaleString()}kb
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
