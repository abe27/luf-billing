/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayOut, UserActionTable, AddNewUser } from "@/components";
import { Input, Button, Loading } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

const MemberPage = () => {
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
      // console.dir(res);
      // toast({
      //   title: "Error Alert!",
      //   description: "We've created your account for you.",
      //   status: "error",
      //   duration: 1500,
      //   isClosable: true,
      //   onCloseComplete: () => setLoading(false),
      // });
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
          <span className="text-4xm text-gray-500">User</span>
        </div>
        <div className="mt-4 rounded shadow p-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-start space-x-4">
              <Input
                clearable
                contentRight={loading && <Loading size="xs" />}
                placeholder="Username"
                value={txtSearchUserName}
                onChange={(e) => setSearchUserName(e.target.value)}
              />
              <Input
                clearable
                contentRight={loading && <Loading size="xs" />}
                placeholder="Name"
                value={txtSearchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Input
                clearable
                contentRight={loading && <Loading size="xs" />}
                placeholder="Role"
                value={txtSearchRole}
                onChange={(e) => setSearchRole(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4 z-0">
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
              <AddNewUser reloadData={fetchData} />
            </div>
          </div>
          <>
            <UserActionTable
              data={obj}
              limit={currentLimit}
              page={currentPage}
              totalPage={totalPage}
              changeLimit={(t) => setCurrentLimit(t)}
              reloadData={fetchData}
            />
          </>
        </div>
      </MainLayOut>
    </>
  );
};

export default MemberPage;
