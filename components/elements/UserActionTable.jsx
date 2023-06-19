import { DateTime } from "@/hooks";
import { Button, Pagination } from "@nextui-org/react";
import AddNewUser from "./AddNewUser";
import ConfirmDialog from "./ConfirmDialog";

const UserActionTable = ({
  data = [],
  limit = 10,
  page = 1,
  totalPage = 3,
  changeLimit = false,
  reloadData = false,
}) => {
  const afterUpdate = () => {
    console.dir("after update");
    reloadData();
  };
  return (
    <>
      <div className="mt-4">
        <table className="table table-hover table-compact w-full">
          <thead>
            <tr>
              <th className="normal-case">No.</th>
              <th className="normal-case">Username</th>
              <th className="normal-case">Name</th>
              <th className="normal-case">E-Mail</th>
              <th className="normal-case">Role</th>
              <th className="normal-case">Vendor</th>
              <th className="normal-case">Company</th>
              <th className="normal-case">Create Date</th>
              <th className="normal-case">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map((i, x) => (
                <tr key={i.id}>
                  <td>{x + 1}</td>
                  <td>{i.username}</td>
                  <td>{i.full_name}</td>
                  <td>{i.email}</td>
                  <td>
                    <span
                      className={
                        i.role.title === "Vendor"
                          ? "text-rose-400"
                          : i.role.title === "Administrator"
                          ? "text-indigo-500"
                          : ""
                      }
                    >
                      {i.role.title}
                    </span>
                  </td>
                  <td>{i.vendor_group.title}</td>
                  <td>{i.company}</td>
                  <td>{DateTime(i.created_at)}</td>
                  <td>
                    <div className="flex justify-between">
                      <div className="flex justify-start space-x-2">
                        <AddNewUser
                          isEdit={true}
                          userData={i}
                          reloadData={afterUpdate}
                        />
                      </div>
                      <div className="flex justify-start">
                        <ConfirmDialog
                          id={i.id}
                          reloadData={() => afterUpdate()}
                        />
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

export default UserActionTable;
