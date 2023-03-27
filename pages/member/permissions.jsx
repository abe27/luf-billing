/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input, Button, Loading } from "@nextui-org/react";
import { MainLayOut, AddNewPermissions, PermisionTable } from "@/components";
import { useSession } from "next-auth/react";

const MemberPermisionPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(2);
  const [txtSearch, setTxtSearch] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setData([]);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url = `${process.env.API_HOST}/permission`;
    if (txtSearch) {
      url = `${process.env.API_HOST}/permission?search=${txtSearch}`;
    }
    const res = await fetch(url, requestOptions);

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
      setTotalPage(Math.ceil(data.data.length / currentLimit));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [currentLimit, txtSearch]);

  return (
    <>
      <MainLayOut title="Management User Permision">
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/monitor`}>User Management</Link>
          </span>
          <span className="text-4xm font-bold">/</span>
          <span className="text-4xm text-gray-500">Permissions</span>
        </div>
        <div className="mt-4">
          <div className="rounded shadow p-4">
            <div className="flex justify-between">
              <div className="flex justify-start">
                <Input
                  clearable
                  contentRight={loading && <Loading size="xs" />}
                  placeholder="Permisions"
                  value={txtSearch}
                  onChange={(e) => setTxtSearch(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  flat
                  color="primary"
                  auto
                  size={"sm"}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  }
                  onPress={fetchData}
                >
                  Search
                </Button>
                <AddNewPermissions
                  flat={false}
                  color="primary"
                  token={session?.user.accessToken}
                  reloadData={fetchData}
                />
              </div>
            </div>
          </div>
        </div>
        <>
          <PermisionTable
            data={data}
            currentLimit={currentLimit}
            totalPage={totalPage}
            setCurrentLimit={(n) => setCurrentLimit(n)}
            reloadData={() => fetchData()}
            token={session?.user.accessToken}
            onDeleted={() => fetchData()}
          />
        </>
      </MainLayOut>
    </>
  );
};

export default MemberPermisionPage;
