import { Pagination } from "@nextui-org/react";
import { DateTime } from "@/hooks";
import { AddOrUpdateMaster, ConfirmDelete } from "..";

const TableViewMaster = ({
  data = [],
  limit = 10,
  page = 1,
  totalPage = 3,
  changeLimit = false,
  reloadData = false,
  token = null,
  isConfirmDelete,
}) => {
  const afterUpdate = () => {
    reloadData();
  };

  const isConfirm = (obj) => {
    return isConfirmDelete(obj);
  };

  return (
    <>
      <div className="mt-4">
        <table className="table table-hover table-compact w-full">
          <thead>
            <tr>
              <th className="normal-case">No.</th>
              <th className="normal-case">Title</th>
              <th className="normal-case">Description</th>
              <th className="normal-case">Status</th>
              <th className="normal-case">Create Date</th>
              <th className="normal-case">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map((i, x) => (
                <tr key={i.id}>
                  <td>{x + 1}</td>
                  <td>{i.title}</td>
                  <td>{i.description}</td>
                  <td>
                    <span
                      className={
                        i.is_active ? "text-green-400" : "text-rose-500"
                      }
                    >
                      {i.is_active ? "active" : "disabled"}
                    </span>
                  </td>
                  <td>{DateTime(i.created_at)}</td>
                  <td>
                    <div className="flex space-x-2">
                      <div className="flex">
                        <AddOrUpdateMaster
                          size="xs"
                          color="warning"
                          flat={true}
                          isEdit={true}
                          reloadData={afterUpdate}
                          obj={i}
                          token={token}
                        />
                      </div>
                      <div className="flex">
                        <ConfirmDelete id={i.id} isConfirm={isConfirm} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {data?.length > 0 ? (
        <div className="mt-4 flex justify-between">
          {data.length > 5 ? (
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
          ) : null}
          <div className="flex justify-end">
            {totalPage > 1 ? (
              <Pagination total={totalPage} initialPage={page} />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TableViewMaster;
