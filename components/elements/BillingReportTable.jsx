import { ColorInt, DateString } from "@/hooks";
import { Button, Input, Loading, Pagination } from "@nextui-org/react";

const BillingReportTable = ({
  data,
  limit = 10,
  page = 3,
  changeLimit = false,
  isAdmin = true,
}) => {
  return (
    <>
      <div className="mt-4">
        {isAdmin ? (
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
                  <td>{i.vendor_code}</td>
                  <td>{i.vendor_name}</td>
                  <td>{i.vendor_group.title}</td>
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
        ) : (
          <table className="table table-hover table-compact w-full">
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
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex justify-start">
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            value={limit}
            onChange={(e) => changeLimit(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex justify-end">
          <Pagination total={1} initialPage={1} />
        </div>
      </div>
    </>
  );
};

export default BillingReportTable;
