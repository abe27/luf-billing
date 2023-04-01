/* eslint-disable react-hooks/exhaustive-deps */
import { ColorInt, DateString } from "@/hooks";
import { getData } from "@/hooks/handler";
import { Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { AiFillFileExcel } from "react-icons/ai";

const OverdueBillingAllTable = ({ user, statusData }) => {
  const tableRef = useRef();
  const [currentLimit, setCurrentLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [billing, setBilling] = useState([]);
  const [billingNo, setBillingNo] = useState(null);
  const [billingDate, setBillingDate] = useState(null);
  const [billingStatus, setBillingStatus] = useState(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `ExportBillingStatus`,
    sheet: "Billing Report",
  });

  const fetchData = async () => {
    setLoading(true);
    const data = await getData(
      `${process.env.API_HOST}/billing/history?vendor_group=${user.vendor_group}`,
      user.accessToken
    );

    if (!data) {
      setLoading(false);
    }

    if (data) {
      console.dir(data);
      setLoading(false);
      setData(data);
    }
  };

  const fetchBilling = async (url) => {
    setBilling([]);
    const data = await getData(url, user.accessToken);
    if (!data) {
      setLoading(false);
    }

    if (data) {
      console.dir(data);
      setLoading(false);
      setBilling(data);
    }
  };

  useEffect(() => {
    if (user.accessToken) fetchData();
  }, [user]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list?vendor_group=${user.vendor_group}`;
    if (billingNo) {
      url = `${process.env.API_HOST}/billing/list?vendor_group=${
        user.vendor_group
      }&billing_no=${billingNo.toUpperCase()}`;
      fetchBilling(url);
    }
  }, [billingNo]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    if (billingDate) {
      url = `${process.env.API_HOST}/billing/list?vendor_group=${user.vendor_group}&billing_date=${billingDate}`;
      fetchBilling(url);
    }
  }, [billingDate]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    if (billingStatus) {
      url = `${process.env.API_HOST}/billing/list?vendor_group=${user.vendor_group}&status_id=${billingStatus}`;
      fetchBilling(url);
    }
  }, [billingStatus]);

  useEffect(() => {
    if (user.accessToken) {
      let url = `${process.env.API_HOST}/billing/list?vendor_group=${user.vendor_group}&`;
      fetchBilling(url);
      fetchData();
    }
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
              <select
                className="select select-ghost max-w-xs"
                value={billingStatus}
                onChange={(e) => setBillingStatus(e.target.value)}
              >
                <option disabled className="text-gray-200">
                  Status
                </option>
                {statusData.map((i, x) => (
                  <option key={x} value={i.id}>
                    {i.title}
                  </option>
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
          <div className="flex justify-between mt-4">
            {data?.map((i, x) => (
              <div
                className="flex justify-center rounded shadow p-4 items-center w-auto"
                key={x}
              >
                <div className="items-center">
                  <div className="">
                    <span className="text-4xm font-bold">
                      {i.sum.toLocaleString()}&nbsp;<span>Bath</span>
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="">{i.title}</span> total.
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
              onPress={onDownload}
            >
              Export Excel
            </Button>
          </div>
          <>
            <div className="overflow-x-auto mt-4">
              <table className="table w-full table-compact" ref={tableRef}>
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
                  {billing?.map((i, x) => (
                    <tr key={x}>
                      <th>{x + 1}</th>
                      <td>{i.billing_no}</td>
                      <td>{DateString(i.billing_date)}</td>
                      <td>{DateString(i.due_date)}</td>
                      <td>{i.amount.toLocaleString()}</td>
                      <td>
                        <Button
                          flat
                          size={"xs"}
                          auto
                          color={ColorInt(i.status.seq)}
                        >
                          {i.status.title}
                        </Button>
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

export default OverdueBillingAllTable;
