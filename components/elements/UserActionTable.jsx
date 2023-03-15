import { Button, Pagination } from "@nextui-org/react";
const UserActionTable = ({
  data = [],
  limit = 10,
  page = 1,
  totalPage = 3,
  changeLimit = false,
}) => {
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
              <th className="normal-case">Company</th>
              <th className="normal-case">Create Date</th>
              <th className="normal-case">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i, x) => (
              <tr key={x}>
                <td>{i.id}</td>
                <td>{i.user_id}</td>
                <td>{i.user_name}</td>
                <td>{i.email}</td>
                <td>
                  <span
                    className={
                      i.role === "Vendor"
                        ? "text-rose-400"
                        : i.role === "Admin"
                        ? "text-indigo-500"
                        : ""
                    }
                  >
                    {i.role}
                  </span>
                </td>
                <td>{i.company}</td>
                <td>{i.created_at}</td>
                <td>
                  <div className="flex justify-between">
                    <div className="flex justify-start space-x-4">
                      <Button
                        size={"xs"}
                        color={"primary"}
                        auto
                        flat
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
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        }
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-start">
                      <Button
                        flat
                        size={"xs"}
                        color={"error"}
                        auto
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        }
                      >
                        Delete
                      </Button>
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
            <Pagination total={totalPage} initialPage={page} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserActionTable;
