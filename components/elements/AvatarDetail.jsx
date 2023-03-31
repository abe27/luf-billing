/* eslint-disable react-hooks/exhaustive-deps */
import { DateString } from "@/hooks";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
const AvatarDetail = ({
  user = {},
  billing = {},
  id = 1,
  isShowBilling = false,
  totalOpen = 0,
  totalProcess = 0,
  totalApprove = 0,
  totalReject = 0,
}) => {
  const [billData, setBillingData] = useState([]);

  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/history?vendor_group=${user.vendor_group}`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      console.dir(data.data);
      setBillingData(data.data);
    }

    if (!res.ok) {
      console.error(res.statusText);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <>
      <div className="justify-center bg-white rounded-lg">
        <div className="grid justify-center items-center mt-10">
          <div className="flex justify-center">
            <Avatar
              src={user.avatar_url === "" ? "/emp.png" : user.avatar_url}
              size={"xl"}
              css={{ size: "$20" }}
            />
          </div>
          <div className="text-center">
            <span className="text-4xm font-bold">{user.fullName}</span>
          </div>
          <div className="text-center">
            <span className="text-4xm text-gray-500">
              {user.company ? user.company : process.env.APP_NAME}
            </span>
          </div>
        </div>
        <div className="p-4">
          {isShowBilling ? (
            <>
              <div className="mt-4 grid grid-rows-1">
                <>
                  <span className="text-sm text-bold">Billing No.</span>
                </>
                <>
                  <div className="text-gray-600 bg-gray-50 rounded p-2 w-auto text-sm">
                    {billing.billing_no}
                  </div>
                </>
              </div>
              <div className="mt-4 grid grid-rows-1">
                <>
                  <span className="text-sm text-bold">Billing Date</span>
                </>
                <>
                  <div className="text-gray-600 bg-gray-50 rounded p-2 w-auto text-sm">
                    {DateString(billing.billing_date)}
                  </div>
                </>
              </div>
              <div className="mt-4 grid grid-rows-1">
                <>
                  <span className="text-sm text-bold">Due Date</span>
                </>
                <>
                  <div className="text-gray-600 bg-gray-50 rounded p-2 w-auto text-sm">
                    {DateString(billing.due_date)}
                  </div>
                </>
              </div>
              <div className="mt-4 grid grid-rows-1">
                <>
                  <span className="text-sm text-bold">Amount</span>
                </>
                <>
                  <div className="text-gray-600 bg-gray-50 rounded p-2 w-auto text-sm">
                    {billing?.amount ? billing?.amount.toLocaleString() : 0}
                  </div>
                </>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="mt-4 grid">
            <>
              <span className="text-sm text-bold">Billing Total</span>
            </>

            <div className="flex items-center justify-between text-center space-x-4 mt-4">
              <>
                <div className="grid grid-rows-2 rounded-lg bg-gray-100 p-2 shadow">
                  <span className="text-xs">{totalOpen.toLocaleString()}</span>
                  <span className="text-xs">Open</span>
                </div>
              </>
              <div className="w-20">
                <div className="grid grid-rows-2 rounded-lg bg-gray-100 p-2 shadow">
                  <span className="text-xs">
                    {totalProcess.toLocaleString()}
                  </span>
                  <span className="text-xs">On Process</span>
                </div>
              </div>
              <>
                <div className="grid grid-rows-2 rounded-lg bg-gray-100 p-2 shadow">
                  <span className="text-xs">
                    {totalApprove.toLocaleString()}
                  </span>
                  <span className="text-xs">Approved</span>
                </div>
              </>
              <>
                <div className="grid grid-rows-2 rounded-lg bg-gray-100 p-2 shadow">
                  <span className="text-xs">
                    {totalReject.toLocaleString()}
                  </span>
                  <span className="text-xs">Rejected</span>
                </div>
              </>
            </div>
          </div>
          <div className="mt-4 grid grid-rows-1">
            <>
              <span className="text-sm text-bold">Detail</span>
            </>
            {/* <Badge color="secondary" variant="bordered">
              Vendor
            </Badge> */}
            <span className="text-xs bg-gray-100 p-2 w-auto rounded shadow">
              {user.role}
            </span>
          </div>
          <div className="mt-4 grid grid-rows-1">
            <>
              <span className="text-sm text-bold">Username</span>
            </>
            <>
              <span className="text-xs bg-gray-100 p-2 w-auto rounded shadow">
                {user.userName}
              </span>
            </>
          </div>
          <div className="mt-4 grid grid-rows-1">
            <>
              <span className="text-sm text-bold">E-Mail</span>
            </>
            <>
              <div className="text-xs bg-gray-100 p-2 w-auto rounded shadow">
                {user.email}
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarDetail;
