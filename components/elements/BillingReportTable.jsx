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
        <table className="table table-hover table-compact w-full">
          <thead>
            <tr>
              <th className="normal-case">No.</th>
              <th className="normal-case">Billing No.</th>
              <th className="normal-case">Billing Date</th>
              <th className="normal-case">Due Date</th>
              <th className="normal-case">Amount</th>
              {isAdmin ? (
                <>
                  <th className="normal-case">Vendor Code</th>
                  <th className="normal-case">Vendor Name</th>
                  <th className="normal-case">Vendor Group</th>
                </>
              ) : null}
              <th className="normal-case">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i, x) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.billing_no}</td>
                <td>{i.billing_date}</td>
                <td>{i.due_date}</td>
                <td>{i.amount.toLocaleString()}</td>
                {isAdmin ? (
                  <>
                    <td>{i.vendor_code}</td>
                    <td>{i.vender_name}</td>
                    <td>{i.vendor_group}</td>
                  </>
                ) : null}
                <td>
                  <Button flat color={i.status.color} auto size={"sm"}>
                    {i.status.name}
                  </Button>
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
          <Pagination total={page} initialPage={1} />
        </div>
      </div>
    </>
  );
};

export default BillingReportTable;
