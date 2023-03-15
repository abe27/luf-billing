import { AddEditRole, MainLayOut } from "@/components";
import Link from "next/link";

const MemberRolePage = () => {
  return (
    <>
      <MainLayOut title="Management User Roles">
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/monitor`}>User Management</Link>
          </span>
          <span className="text-4xm font-bold">/</span>
          <span className="text-4xm text-gray-500">Roles</span>
        </div>
        <div className="mt-4 flex space-x-8 pl-4">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-4xm">Administrator</h2>
              <p className="text-gray-400">
                Total user with this roles:{" "}
                <span className="text-sm font-bold">X</span>
              </p>
              <p className="text-gray-400">
                Detail:{" "}
                <span className="text-sm font-bold">
                  The accountant handlers everything of then system.
                </span>
              </p>
              <p className="text-gray-400">
                <span className="text-4xm font-bold">Permissions</span>
                <div className="grid grid-rows-2 pl-4">
                  <div className="flex justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-sky-400 pt-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                    <span>Billing Monitor</span>
                  </div>
                  <div className="flex justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-sky-400 pt-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                    <span>User Manangement</span>
                  </div>
                </div>
              </p>
              <div className="card-actions justify-end">
                <AddEditRole isEdit={true} role_id={"1"} />
              </div>
            </div>
          </div>
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-4xm">Vendor</h2>
              <p className="text-gray-400">
                Total user with this roles:{" "}
                <span className="text-sm font-bold">X</span>
              </p>
              <p className="text-gray-400">
                Detail:{" "}
                <span className="text-sm font-bold">Vendor upload files.</span>
              </p>
              <p className="text-gray-400">
                <span className="text-4xm font-bold">Permissions</span>
                <div className="grid grid-rows-2 pl-4">
                  <div className="flex justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-sky-400 pt-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                    <span>Overdue Billing</span>
                  </div>
                </div>
              </p>
              <div className="card-actions justify-end">
                <AddEditRole isEdit={true} role_id={"2"} />
              </div>
            </div>
          </div>
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-4xm">Add New Role</h2>
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="w-36 h-36 text-indigo-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <div className="card-actions justify-end">
                <AddEditRole />
              </div>
            </div>
          </div>
        </div>
      </MainLayOut>
    </>
  );
};

export default MemberRolePage;
