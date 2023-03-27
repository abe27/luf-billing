import { Pagination } from "@nextui-org/react";
import AddNewPermisions from "./AddNewPermissions";
import { ConfirmDelete } from "..";
import { DateTime } from "@/hooks";
import Swal from "sweetalert2/dist/sweetalert2.js";

const PermisionTable = ({
  data = [],
  currentLimit = 5,
  totalPage = 2,
  currentPage = 1,
  setCurrentLimit = false,
  reloadData = false,
  token = null,
  onDeleted = false,
}) => {
  const ConfirmDeleteData = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/permission/${id}`,
      requestOptions
    );
    if (res.ok) {
      Swal.fire({
        text: "Delete Success!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => onDeleted());
    }
  };

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
                <td>{x + 1}</td>
                <td>{i.title}</td>
                <td>{i.description}</td>
                <td>{DateTime(i.created_at)}</td>
                <td>
                  <div className="flex justify-center space-x-2">
                    <AddNewPermisions
                      color="warning"
                      isEdit={true}
                      flat={true}
                      size="xs"
                      title="Edit"
                      propData={i}
                      token={token}
                      reloadData={() => reloadData()}
                    />
                    <ConfirmDelete
                      id={i.id}
                      text={`Do you want delete ${i.title}?`}
                      isConfirm={ConfirmDeleteData}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPage > 1 ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default PermisionTable;
