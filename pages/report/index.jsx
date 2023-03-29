/* eslint-disable react-hooks/exhaustive-deps */
import { BillingReportTable, MainLayOut } from "@/components";
import { Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const BillingReportingPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url =
      `${process.env.API_HOST}/billing/list?billing_no=null&billing_date=null&vendor_group=null`.replace(
        "null",
        ""
      );

    console.log(url);

    const res = await fetch(url, requestOptions);

    if (res.ok) {
      const data = await res.json();
      console.dir(data.data);
      setData(data.data);
      setTotalPage(Math.ceil(data.data.length / currentLimit));
      setLoading(false);
    }
  };

  const handlerChangeLimit = (limit) => {
    setCurrentLimit(limit);
  };
  const handleExportExcelClick = () => {};

  useEffect(() => {
    if (session?.user) fetchData();
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [currentLimit]);
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
                    size="xs"
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    placeholder="Billing No."
                  />
                  <Input
                    size="xs"
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    type={"date"}
                    placeholder="Billing Start Date"
                  />
                  <Input
                    size="xs"
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    type={"date"}
                    placeholder="Billing End Date"
                  />
                </div>
                <div className="flex flex-wrap justify-start space-x-24 mt-4">
                  <Input
                    size="xs"
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    placeholder="Vendor code"
                  />
                  <Input
                    size="xs"
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    placeholder="Vendor name"
                  />
                  <select className="select select-ghost select-sm max-w-xs select-xs">
                    <option disabled>Vendor Group</option>
                    <option>Group A</option>
                    <option>Group B</option>
                    <option>Group C</option>
                  </select>
                  {/* </div>
                <div className="flex flex-wrap justify-start space-x-24 mt-4"> */}
                  <select className="select select-ghost select-sm max-w-xs select-xs">
                    <option disabled>Status</option>
                    <option>Open</option>
                    <option>On Process</option>
                    <option>Verify</option>
                    <option>Rejected</option>
                    <option>Approved</option>
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
