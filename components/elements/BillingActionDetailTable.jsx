/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Pagination } from "@nextui-org/react";
import { RandomDateString, RandomDocumentName } from "@/hooks";
import VerifyBillingAlert from "./VerifyBillingAlert"
import RejectBillingAlert from "./RejectBillingAlert";
import ViewBillingPDF from "./ViewBillingPDF";

const BillingActionDetailTable = () => {
  const [docData, setDocData] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(5);

  const fetchData = async () => {
    let doc = [];
    for (let i = 0; i < currentLimit; i++) {
      doc.push({
        id: i + 1,
        name: RandomDocumentName(),
        type: "pdf",
        date: RandomDateString(),
      });
    }

    setDocData(doc);
  };

  useEffect(() => {
    fetchData();
  }, [currentLimit]);

  return (
    <>
      <div className="flex justify-end space-x-4">
        <div className="z-0">
          <RejectBillingAlert />
        </div>
        <div className="z-0">
          <VerifyBillingAlert />
        </div>
      </div>
      <div className="mt-4">
        <table className="table table-hover table-compact w-full z-0">
          <thead>
            <tr>
              <th className="normal-case">No.</th>
              <th className="normal-case">Document Name</th>
              <th className="normal-case">Document Type</th>
              <th className="normal-case">Document Date</th>
              <th className="normal-case">Action</th>
            </tr>
          </thead>
          <tbody>
            {docData.map((i, x) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.name}</td>
                <td>{i.type}</td>
                <td>{i.date}</td>
                <td>
                  <ViewBillingPDF />
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
  );
};

export default BillingActionDetailTable;
