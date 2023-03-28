/* eslint-disable react-hooks/exhaustive-deps */
import { BillingReportTable, MainLayOut } from "@/components";
import { Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  RandomDateString,
  RandomAmount,
  RandomVendorcode,
  RandomStatus,
} from "@/hooks";

const BillingReportingUserPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(5);
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

    const res = await fetch(
      `${process.env.API_HOST}/billing/list?billing_no=null&billing_date=null&vendor_group=null`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
      setLoading(false);
    }
  };

  const handlerChangeLimit = (limit) => {
    setCurrentLimit(limit);
  };
  const handleExportExcelClick = () => {};

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentLimit]);
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
                  <select className="select select-ghost select-xs max-w-xs">
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
              page={2}
              changeLimit={handlerChangeLimit}
              isAdmin={false}
            />
          </>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingReportingUserPage;
