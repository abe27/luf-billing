/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Input, Button, Loading, Pagination, Text } from "@nextui-org/react";
import { DateString, RandomAmount, RandomDateString } from "@/hooks";
import { IconStatus } from "..";
import Link from "next/link";

const OverdueBillingTable = ({ vendor_group, status, token }) => {
  const [loading, setLoading] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [data, setData] = useState([]);
  const [billingNo, setBillingNo] = useState("");
  const [billingDate, setBillingDate] = useState("");

  const fetchData = async () => {
    let doc = [];
    setData([]);
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url = `${process.env.API_HOST}/billing/list?vendor_group=${vendor_group}&status_id=${status.id}&billing_no=${billingNo}&billing_date=${billingDate}`;
    console.dir(url);
    const res = await fetch(url, requestOptions);

    if (res.ok) {
      const data = await res.json();
      setLoading(false);
      setData(data.data);
      console.dir(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, billingNo, billingDate]);

  return (
    <>
      <div className="bg-white rounded-lg w-full p-8">
        <span className="text-4xm">Billing</span>
        <div className="mt-4 grid">
          <div className="flex justify-between">
            <div className="flex justify-start space-x-4">
              <Input
                contentRight={loading ? <Loading size="sm" /> : null}
                placeholder="Billing No."
                value={billingNo}
                onChange={(e) => setBillingNo(e.target.value)}
              />
              <Input
                contentRight={loading ? <Loading size="sm" /> : null}
                type={"date"}
                placeholder="Billing Date"
                value={billingDate}
                onChange={(e) => setBillingDate(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button
                flat
                color="primary"
                auto
                size={"sm"}
                icon={
                  !loading ? (
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
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  ) : (
                    <></>
                  )
                }
                onPress={fetchData}
              >
                {loading ? (
                  <Loading color="currentColor" size="sm" />
                ) : (
                  <span>Search</span>
                )}
              </Button>
            </div>
          </div>
          <>
            <div className="overflow-x-auto mt-4">
              <table className="table w-full table-compact">
                <thead>
                  <tr>
                    <th className="normal-case">No.</th>
                    <th className="normal-case">Billing No.</th>
                    <th className="normal-case">Billing Date</th>
                    <th className="normal-case">Due Date</th>
                    <th className="normal-case">Amount</th>
                    <th className="normal-case">Status</th>
                    <th className="normal-case flex justify-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((i, x) => (
                    <tr key={x}>
                      <th>{x + 1}</th>
                      <td>{i.billing_no}</td>
                      <td>{DateString(i.billing_date)}</td>
                      <td>{DateString(i.due_date)}</td>
                      <td>{i.amount.toLocaleString()}</td>
                      <td>
                        <Text
                          color={
                            i.status.title === "Open"
                              ? "primary"
                              : i.status.title === "On Process"
                              ? "warning"
                              : i.status.title === "Rejected"
                              ? "error"
                              : "success"
                          }
                        >
                          {i.status.title}
                        </Text>
                      </td>
                      <td className="flex justify-end">
                        <Link
                          href={`/overdue/detail?id=${i.id}&status=${i.status.title}`}
                        >
                          <Button
                            flat
                            auto
                            size={"xs"}
                            color={
                              i.status.title === "Open"
                                ? "primary"
                                : i.status.title === "On Process"
                                ? "warning"
                                : i.status.title === "Rejected"
                                ? "error"
                                : "success"
                            }
                            icon={<IconStatus status={i.status.title} />}
                          >
                            {i.status.title === "Open"
                              ? "Upload File"
                              : i.status.title === "On Process"
                              ? "Check Status"
                              : i.status.title === "Rejected"
                              ? "Resend File"
                              : "View Detail"}
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* {data?.length > 0 ? (
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
            ) : (
              <></>
            )} */}
          </>
        </div>
      </div>
    </>
  );
};

export default OverdueBillingTable;
