/* eslint-disable react-hooks/exhaustive-deps */
import { BillingReportTable, MainLayOut } from "@/components";
import { Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  RandomDateString,
  RandomAmount,
  RandomVendorcode,
  RandomStatus,
} from "@/hooks";

const BillingReportingPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
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
        status: RandomStatus(),
      });
    }
    setData(doc);
    let t = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(t);
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
          <div className="flex justify-between">
            <div className="flex justify-start">
              <div className="grid grid-rows-1">
                <div className="flex flex-wrap justify-start space-x-24">
                  <Input
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    placeholder="Billing No."
                  />
                  <Input
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    type={"date"}
                    placeholder="Billing Start Date"
                  />
                  <Input
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    type={"date"}
                    placeholder="Billing End Date"
                  />
                </div>
                <div className="flex flex-wrap justify-start space-x-24 mt-4">
                  <Input
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    placeholder="Vendor code"
                  />
                  <Input
                    clearable
                    contentRight={loading && <Loading size="xs" />}
                    placeholder="Vendor name"
                  />
                  <select className="select select-ghost select-sm max-w-xs">
                    <option disabled>Vendor Group</option>
                    <option>Group A</option>
                    <option>Group B</option>
                    <option>Group C</option>
                  </select>
                </div>
                <div className="flex flex-wrap justify-start space-x-24 mt-4">
                  <select className="select select-ghost select-sm max-w-xs">
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
              page={2}
              changeLimit={handlerChangeLimit}
            />
          </>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingReportingPage;
