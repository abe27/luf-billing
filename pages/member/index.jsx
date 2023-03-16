/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayOut, UserActionTable, AddNewUser } from "@/components";
import { Input, Button, Loading } from "@nextui-org/react";
import { RandomUserName } from "@/hooks";

const MemberPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = () => {
    setData([]);
    setLoading(true);
    let doc = [];
    for (let i = 0; i < currentLimit; i++) {
      let rdUser = RandomUserName();
      doc.push({
        id: i + 1,
        avatar: rdUser.avatar,
        user_id: rdUser.user_id,
        user_name: rdUser.user_name,
        email: rdUser.email,
        role: rdUser.role,
        company: rdUser.company,
        created_at: rdUser.created_at,
        status: rdUser.status,
      });
    }

    let t = setTimeout(() => {
      setData(doc);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(t);
  };
  const handleAddUserClick = () => {};

  useEffect(() => {
    fetchData();
  }, []);

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
              />
              <Input
                clearable
                contentRight={loading && <Loading size="xs" />}
                placeholder="Name"
              />
              <Input
                clearable
                contentRight={loading && <Loading size="xs" />}
                placeholder="Role"
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
              <AddNewUser />
            </div>
          </div>
          <>
            <UserActionTable
              data={data}
              limit={currentLimit}
              page={currentPage}
              totalPage={totalPage}
              changeLimit={(t) => setCurrentLimit(t)}
            />
          </>
        </div>
      </MainLayOut>
    </>
  );
};

export default MemberPage;
