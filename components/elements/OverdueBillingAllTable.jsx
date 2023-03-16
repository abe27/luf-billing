/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Loading, Button, Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { RandomDateString, RandomAmount, RandomStatus } from "@/hooks";
import { AiFillFileExcel } from "react-icons/ai";

let status = ["Open", "On process", "Rejected", "Approved"];

const OverdueBillingAllTable = () => {
  const [currentLimit, setCurrentLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const fetchData = async () => {
    let s = [];
    let doc = [];
    setLoading(true);
    setData([]);
    setStatusData([]);
    for (let i = 0; i < currentLimit; i++) {
      doc.push({
        id: i + 1,
        billing_no: ("00000000" + (i + 1)).slice(-8),
        billing_date: RandomDateString(),
        due_date: RandomDateString(),
        amount: parseFloat(RandomAmount()),
        status: RandomStatus(),
      });
    }

    for (let i = 0; i < status.length; i++) {
      s.push({
        id: i,
        amount: RandomAmount(),
        description: status[i],
      });
    }

    const t = setTimeout(() => {
      setLoading(false);
      setData(doc);
      setStatusData(s);
    }, 1000);

    return () => clearTimeout(t);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentLimit]);
  return (
    <>
      <div className="bg-white rounded-lg w-full p-8">
        <span className="text-4xm">Billing All</span>
        <div className="grid mt-4">
          <div className="flex justify-between">
            <div className="flex justify-start space-x-4">
              <Input
                contentRight={loading ? <Loading size="sm" /> : null}
                placeholder="Billing No."
              />
              <Input
                contentRight={loading ? <Loading size="sm" /> : null}
                type={"date"}
                placeholder="Billing Date"
              />
              <select className="select select-ghost max-w-xs">
                <option disabled className="text-gray-200">
                  Status
                </option>
                {status.map((i, x) => (
                  <option key={x}>{i}</option>
                ))}
              </select>
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
          <div className="flex justify-start mt-4 space-x-2">
            {statusData?.map((i, x) => (
              <div
                className="flex justify-center rounded shadow p-4 items-center w-auto"
                key={x}
              >
                <div className="grid">
                  <div className="flex justify-center">
                    <span className="text-4xm font-bold">
                      {i.amount.toLocaleString()}
                    </span>
                    &nbsp; Bath
                  </div>
                  <div className="text-xs">
                    Billing <span className="lowercase">{i.description}</span>{" "}
                    amount total.
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4 mb-4">
            <Button
              auto
              color={"success"}
              size={"sm"}
              icon={<AiFillFileExcel size={20} />}
            >
              Export Excel
            </Button>
          </div>
          <>
            <div className="overflow-x-auto mt-4">
              <table className="table w-full table-compact table-zebra">
                <thead>
                  <tr>
                    <th className="normal-case">No.</th>
                    <th className="normal-case">Billing No.</th>
                    <th className="normal-case">Billing Date</th>
                    <th className="normal-case">Due Date</th>
                    <th className="normal-case">Amount</th>
                    <th className="normal-case">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((i, x) => (
                    <tr key={x}>
                      <th>{i.id}</th>
                      <td>{i.billing_no}</td>
                      <td>{i.billing_date}</td>
                      <td>{i.due_date}</td>
                      <td>{i.amount.toLocaleString()}</td>
                      <td>
                        <Button flat size={"xs"} auto color={i.status.color}>
                          {i.status.name}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data?.length > 0 ? (
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
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default OverdueBillingAllTable;
