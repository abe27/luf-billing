/* eslint-disable react-hooks/exhaustive-deps */
import { AddOrUpdateMaster, MainLayOut, TableViewMaster } from "@/components";
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DocumentPage = () => {
  const { data: session } = useSession();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [obj, setObj] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [txtSearchUserName, setSearchUserName] = useState("");
  const [txtSearchName, setSearchName] = useState("");
  const [txtSearchRole, setSearchRole] = useState("");

  const fetchData = async () => {
    setObj([]);
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    console.log(
      `${process.env.API_HOST}/member?username=${txtSearchUserName}&name=${txtSearchName}&role=${txtSearchRole}`
    );
    const res = await fetch(
      `${process.env.API_HOST}/member?username=${txtSearchUserName}&name=${txtSearchName}&role=${txtSearchRole}`,
      requestOptions
    );
    if (!res.ok) {
      setLoading(false);
    }

    if (res.ok) {
      const data = await res.json();
      setObj(data.data);
      setTotalPage(Math.ceil(data.length / currentLimit));
      setLoading(false);
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
              <AddOrUpdateMaster />
            </div>
          </div>
          <>
            <TableViewMaster />
          </>
        </div>
      </MainLayOut>
    </>
  );
};

export default DocumentPage;
