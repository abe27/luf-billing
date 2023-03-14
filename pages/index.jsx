/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import { MainLayOut, AddNewBilling, EditBilling } from "@/components";
import { Input, Button, Pagination } from "@nextui-org/react";
import { RandomDateString,RandomAmount,RandomVendorcode } from "@/hooks";

const IndexPage = () => {
  const inputRef = useRef();
  const [currentLimit, setCurrentLimit] = useState(5);
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

  const handleUploadExcelClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = e => {}

  useEffect(() => {
    fetchData();
  }, [currentLimit]);
  return (
    <>
    <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".xlsx,.csv"
      />
      <MainLayOut>
        <span className="text-4xm font-bold">Import Data Billing</span>
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
                <AddNewBilling />
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
                  onClick={handleUploadExcelClick}
                >
                  Import Excel
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
                          <EditBilling />
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
      </MainLayOut>
    </>
  );
};

export default IndexPage;
