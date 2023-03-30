/* eslint-disable react-hooks/exhaustive-deps */
import { BillingReportTable, MainLayOut } from "@/components";
import { Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getData } from "@/hooks/handler";

const BillingReportingPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [statusData, setStatusData] = useState([]);
  const [vendorGroup, setVendorData] = useState([]);
  const [data, setData] = useState([]);

  const [billingNo, setBillingNo] = useState(null);
  const [billingDate, setBillingDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [vendorCode, setVendorCode] = useState(null);
  const [vendorName, setVendorName] = useState(null);
  const [vendorID, setVendorID] = useState(null);
  const [statusID, setStatusID] = useState(null);

  const fetchData = async (url) => {
    setLoading(true);
    const data = await getData(url, session?.user.accessToken);
    if (data) {
      console.dir(data);
      setData(data);
      setTotalPage(Math.ceil(data.length / currentLimit));
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
    setStatusData(data);
  };

  const fetchVendorGroup = async () => {
    const data = await getData(
      `${process.env.API_HOST}/vendor/group`,
      session?.user.accessToken
    );

    setVendorData(data);
  };

  useEffect(() => {
    if (session?.user) {
      let url = `${process.env.API_HOST}/billing/list?`;
      fetchData(url);
      fetchStatusData();
      fetchVendorGroup();
    }
  }, [session]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    fetchData(url);
  }, [currentLimit]);

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
    if (dueDate) {
      url = `${process.env.API_HOST}/billing/list?due_date=${dueDate}`;
      fetchData(url);
    }
  }, [dueDate]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    if (vendorCode) {
      url = `${process.env.API_HOST}/billing/list?vendor_code=${vendorCode}`;
      fetchData(url);
    }
  }, [vendorCode]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    if (vendorName) {
      url = `${process.env.API_HOST}/billing/list?vendor_name=${vendorName}`;
      fetchData(url);
    }
  }, [vendorName]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    if (vendorID) {
      url = `${process.env.API_HOST}/billing/list?vendor_group=${vendorID}`;
      fetchData(url);
    }
  }, [vendorID]);

  useEffect(() => {
    let url = `${process.env.API_HOST}/billing/list`;
    if (statusID) {
      url = `${process.env.API_HOST}/billing/list?status_id=${statusID}`;
      fetchData(url);
    }
  }, [statusID]);

  return (
    <>
      <MainLayOut title="Billing Reporting">
        <span className="text-4xm font-bold">Billing Report</span>
        <div className="mt-4 rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div className="flex justify-start">
              <div className="grid grid-rows-1">
                <div className="flex flex-wrap justify-start space-x-24">
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
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  /> */}
                </div>
                <div className="flex flex-wrap justify-start space-x-24 mt-4">
                  <Input
                    size="sm"
                    clearable
                    contentRight={loading && <Loading size="sm" />}
                    placeholder="Vendor code"
                    value={vendorCode}
                    onChange={(e) => setVendorCode(e.target.value)}
                  />
                  <Input
                    size="sm"
                    clearable
                    contentRight={loading && <Loading size="sm" />}
                    placeholder="Vendor name"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                  />
                  <select
                    className="select select-ghost select-sm max-w-xs select-xs"
                    value={vendorID}
                    onChange={(e) => setVendorID(e.target.value)}
                  >
                    <option>Vendor Group</option>
                    {vendorGroup.map((i) => (
                      <option value={i.id} key={i.id}>
                        {i.title}
                      </option>
                    ))}
                  </select>
                  {/* </div>
                <div className="flex flex-wrap justify-start space-x-24 mt-4"> */}
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
            <div className="flex justify-end space-x-4">
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
                    className="w-6 h-6"
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
                onClick={handleExportExcelClick}
              >
                Export Excel
              </Button>
            </div>
          </div>
          <>
            <BillingReportTable
              data={data}
              limit={currentLimit}
              page={totalPage}
              changeLimit={handlerChangeLimit}
            />
          </>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingReportingPage;
