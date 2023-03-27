/* eslint-disable react-hooks/exhaustive-deps */
import { AddOrUpdateMaster, MainLayOut, TableViewMaster } from "@/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";

const DocumentPage = () => {
  const { data: session } = useSession();
  const [obj, setObj] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(2);

  const fetchData = async () => {
    setObj([]);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    console.log(session?.user.accessToken);

    const res = await fetch(
      `${process.env.API_HOST}/document/list`,
      requestOptions
    );
    if (res.ok) {
      const data = await res.json();
      setObj(data.data);
      setTotalPage(Math.ceil(data.length / currentLimit));
    }
  };

  const confirmDelete = async (doc) => {
    console.dir(doc);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/document/list/${doc}`,
      requestOptions
    );

    if (res.ok) {
      Swal.fire({
        text: `Delete Success!`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => fetchData());
      return;
    }

    if (!res.ok) {
      Swal.fire({
        text: res.error,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => fetchData());
      return;
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [currentLimit]);

  return (
    <>
      <MainLayOut title="Member Management">
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/monitor`}>User Management</Link>
          </span>
          <span className="text-4xm font-bold">/</span>
          <span className="text-4xm text-gray-500">Document</span>
        </div>
        <div className="mt-4 rounded shadow p-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-start space-x-4">
              <></>
            </div>
            <div className="flex justify-end space-x-4 z-0">
              <></>
              <AddOrUpdateMaster
                reloadData={fetchData}
                token={session?.user.accessToken}
              />
            </div>
          </div>
          <>
            <TableViewMaster
              data={obj}
              totalPage={totalPage}
              token={session?.user.accessToken}
              reloadData={fetchData}
              isConfirmDelete={confirmDelete}
            />
          </>
        </div>
      </MainLayOut>
    </>
  );
};

export default DocumentPage;
