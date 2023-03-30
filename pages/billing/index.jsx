/* eslint-disable react-hooks/exhaustive-deps */
import { BillingReportTable, MainLayOut } from "@/components";
import { Button, Input, Loading } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { getData } from "@/hooks/handler";
import { ColorInt, DateString } from "@/hooks";
import { useDownloadExcel } from "react-export-table-to-excel";

const BillingReportingUserPage = () => {
  const tableRef = useRef();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [statusData, setStatusData] = useState([]);
  const [billingNo, setBillingNo] = useState(null);
  const [billingDate, setBillingDate] = useState(null);
  const [statusID, setStatusID] = useState(null);
  const [data, setData] = useState([]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `ExportBillingReport`,
    sheet: "Billing Report",
  });

  const fetchData = async (url) => {
    setLoading(true);
    const data = await getData(url, session?.user.accessToken);
    if (data) {
      setData(data);
      setLoading(false);
    }
  };

  const handlerChangeLimit = (limit) => {
    setCurrentLimit(limit);
  };
  const handleExportExcelClick = () => {};

  const fetchStatusData = async () => {
    const data = await getData(
      `${process.env.API_HOST}/status`,
      session?.user.accessToken
    );
    if (data) setStatusData(data);
  };

  useEffect(() => {
    if (session) {
      let url = `${process.env.API_HOST}/billing/list?billing_no=&billing_date=&vendor_group=`;
      fetchStatusData();
      fetchData(url);
    }
  }, [session]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    if (billingNo) {
      url = `${process.env.API_HOST}/billing/list?billing_no=${billingNo}`;
      fetchData(url);
    }
  }, [billingNo]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    if (billingDate) {
      url = `${process.env.API_HOST}/billing/list?billing_date=${billingDate}`;
      fetchData(url);
    }
  }, [billingDate]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    if (statusID) {
      url = `${process.env.API_HOST}/billing/list?status_id=${statusID}`;
      fetchData(url);
    }
  }, [statusID]);

  // useEffect(() => {
  //   let hurl = `${process.env.API_HOST}/billing/list?billing_no=null&billing_date=null&vendor_group=null`;
  //   if (url) {
  //     hurl = url;
  //   }
  //   fetchData();
  // }, [currentLimit]);
  return (
    <>
      <MainLayOut title="Billing Reporting">
        <span className="text-4xm font-bold">Billing Report</span>
        <div className="mt-4 rounded-lg shadow p-4">
          <div className="flex justify-between w-full z-0">
            <div className="flex justify-start">
              <div className="grid grid-rows-1">
                <div className="flex flex-wrap justify-start space-x-4">
                  <Input
                    size="sm"
                    clearable
                    contentRight={loading && <Loading size="sm" />}
                    placeholder="Billing No."
                    value={billingNo}
                    onChange={(e) => setBillingNo(e.target.value)}
                  />
                  <Input
                    size="sm"
                    clearable
                    contentRight={loading && <Loading size="sm" />}
                    type={"date"}
                    placeholder="Billing Start Date"
                    value={billingDate}
                    onChange={(e) => setBillingDate(e.target.value)}
                  />
                  {/* <Input
                    size="sm"
                    clearable
                    contentRight={loading && <Loading size="sm" />}
                    type={"date"}
                    placeholder="Billing End Date"
                  /> */}
                  <select
                    className="select select-ghost select-sm max-w-xs select-xs"
                    value={statusID}
                    onChange={(e) => setStatusID(e.target.value)}
                  >
                    <option>Status</option>
                    {statusData.map((i) => (
                      <option value={i.id} key={i.id}>
                        {i.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 z-0">
              <Button
                flat
                color="primary"
                auto
                size={"sm"}
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
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                }
                onPress={fetchData}
              >
                Search
              </Button>
              <Button
                flat
                color="success"
                auto
                size={"sm"}
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
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                    />
                  </svg>
                }
                onClick={onDownload}
              >
                Export Excel
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <table
              className="table table-hover table-compact w-full"
              ref={tableRef}
            >
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
                {data.map((i, x) => (
                  <tr key={i.id}>
                    <td>{x + 1}</td>
                    <td>{i.billing_no}</td>
                    <td>{DateString(i.billing_date)}</td>
                    <td>{DateString(i.due_date)}</td>
                    <td>{i.amount.toLocaleString()}</td>
                    <td>
                      <Button
                        flat
                        color={ColorInt(i.status.seq)}
                        auto
                        size={"xs"}
                      >
                        {i.status.title}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <BillingReportTable
              data={data}
              limit={currentLimit}
              page={2}
              changeLimit={handlerChangeLimit}
              isAdmin={false}
            /> */}
          </div>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingReportingUserPage;
