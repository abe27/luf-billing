/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Pagination, Input, Button, Tooltip } from "@nextui-org/react";
import { RandomDateString, RandomAmount, RandomVendorcode } from "@/hooks";
import Link from "next/link";
import BillingApproveAlert from "./BillingApproveAlert";
import { ViewRejectDetail } from "..";

const classStatus = [
  { status: "In Process", name: "bg-blue-500" },
  { status: "Verify", name: "bg-green-500" },
  { status: "Rejected", name: "bg-rose-500" },
  { status: "Approved", name: "bg-indigo-500" },
];

const BillingActionTable = ({ status, limitPage = 5 }) => {
  const [currentLimit, setCurrentLimit] = useState(0);
  const [invData, setInvData] = useState([]);

  const fetchData = async () => {
    let doc = [];
    for (let i = 0; i < currentLimit; i++) {
      doc.push({
        id: i + 1,
        billing_no: ("0000000" + (i + 1)).slice(-8), // Billing No.
        billing_date: RandomDateString(), // Billing Date
        due_date: RandomDateString(), // Due Date
        amount: RandomAmount(), // Amount
        vendor_code: RandomVendorcode(), // Vendor Code
        vender_name: "XXXXXXX", // Vendor Name
        vendor_group: "G" + ("000" + (i + 1)).slice(-3), // Vendor Group
      });
    }
    setInvData(doc);
  };

  const checkStatus = (txt) => {
    classStatus.map((item, index) => {
      console.log(item.status === txt);
      if (item.status === txt) {
        return item.name;
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [currentLimit]);

  useEffect(() => {
    setCurrentLimit(limitPage);
  }, [limitPage]);

  return (
    <>
      <div className="mt-4 rounded-lg shadow p-4">
        <div className="flex justify-between">
          <div className="flex justify-start space-x-4">
            <Input clearable placeholder="Billing No." />
            <Input width="186px" type="date" placeholder="Billing Date" />
            <select className="select select-ghost max-w-xs">
              <option disabled selected>
                Vendor Group
              </option>
              <option>Grp. A</option>
              <option>Grp. B</option>
              <option>Grp. C</option>
            </select>
            <select className="select select-ghost max-w-xs">
              <option disabled selected>
                Status
              </option>
              <option>On Process</option>
              <option>Verify</option>
              <option>Rejected</option>
              <option>Approved</option>
            </select>
          </div>
          <div className="flex justify-end z-0">
            <div className="flex justify-end space-x-4">
              <Button
                flat
                color="primary"
                auto
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                }
              >
                Search
              </Button>
              <Button
                flat
                color="success"
                auto
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-file-spreadsheet"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                    <path d="M8 11h8v7h-8z"></path>
                    <path d="M8 15h8"></path>
                    <path d="M11 11v7"></path>
                  </svg>
                }
              >
                Export Excel
              </Button>
            </div>
          </div>
        </div>
        {invData.length > 0 && (
          <>
            <div className="mt-4">
              <table className="table table-hover table-compact w-full">
                <thead>
                  <tr>
                    <th className="normal-case">No.</th>
                    <th className="normal-case">Billing No.</th>
                    <th className="normal-case">Billing Date</th>
                    <th className="normal-case">Due Date</th>
                    <th className="normal-case">Amount</th>
                    <th className="normal-case">Vendor Code</th>
                    <th className="normal-case">Vendor Name</th>
                    <th className="normal-case">Vendor Group</th>
                    <th className="normal-case">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invData.map((i) => (
                    <tr key={i.id}>
                      <td>{i.id}</td>
                      <td>{i.billing_no}</td>
                      <td>{i.billing_date}</td>
                      <td>{i.due_date}</td>
                      <td>{i.amount.toLocaleString()}</td>
                      <td>{i.vendor_code}</td>
                      <td>{i.vender_name}</td>
                      <td>{i.vendor_group}</td>
                      <td>
                        {status === "Verify" ? (
                          <Link
                            href={`/monitor/detail?id=${i.billing_no}&action=${status}`}
                          >
                            <Button
                              flat
                              color="primary"
                              auto
                              size={"xs"}
                              icon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              }
                            >
                              Verify
                            </Button>
                          </Link>
                        ) : status === "Approve" ? (
                          <BillingApproveAlert />
                        ) : status === "View" ? (
                          <ViewRejectDetail />
                        ) : (
                          <Link href={`/monitor/approve?id=${i.billing_no}`}>
                            <Button
                              flat
                              color="secondary"
                              auto
                              size={"xs"}
                              icon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              }
                            >
                              View Detail
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between">
              <div className="flex justify-start">
                <select
                  className="select select-bordered select-sm w-full max-w-xs"
                  value={currentLimit}
                  onChange={(e) => setCurrentLimit(e.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Pagination total={2} initialPage={1} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BillingActionTable;