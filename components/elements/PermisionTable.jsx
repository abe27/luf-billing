import { Pagination } from "@nextui-org/react";
import AddNewPermisions from "./AddNewPermisions";
import ConfirmDialog from "./ConfirmDialog";

const PermisionTable = ({
  data = [],
  currentLimit = 5,
  totalPage = 2,
  currentPage = 1,
  setCurrentLimit = false,
}) => {
  return (
    <>
      <div className="mt-4">
        <table className="table table-hover table-compact w-full">
          <thead>
            <tr>
              <th className="normal-case">No.</th>
              <th className="normal-case">Name</th>
              <th className="normal-case">Detail</th>
              <th className="normal-case">Create Date</th>
              <th className="normal-case">
                <div className="flex justify-center">Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((i, x) => (
              <tr key={x}>
                <td>{i.id}</td>
                <td>{i.name}</td>
                <td>{i.detail}</td>
                <td>{i.created_at}</td>
                <td>
                  <div className="flex justify-end space-x-2">
                    <AddNewPermisions color="warning" isEdit={true} flat={true} size="xs" title="Edit" />
                    <ConfirmDialog id={i.id} />
                  </div>
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
          <Pagination total={totalPage} initialPage={currentPage} />
        </div>
      </div>
    </>
  );
};

export default PermisionTable;
