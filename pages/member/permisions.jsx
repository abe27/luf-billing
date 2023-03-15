/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input, Button, Loading } from "@nextui-org/react";
import { MainLayOut, AddNewPermisions, PermisionTable } from "@/components";
import { RandomPermision } from "@/hooks";

const MemberPermisionPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(5);

  const fetchData = async () => {
    setLoading(true);
    setData([])
    let doc = [];
    for (let i = 0; i < currentLimit; i++) {
      let permision = await RandomPermision();
      doc.push({
        id: i + 1,
        name: permision.name,
        detail: permision.detail,
        created_at: permision.created_at,
      });
    }
    const t = setTimeout(() => {
      setData(doc);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(t);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentLimit]);

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
                <AddNewPermisions flat={false} color="primary" />
              </div>
            </div>
          </div>
        </div>
        <>
          <PermisionTable
            data={data}
            currentLimit={currentLimit}
            setCurrentLimit={(n) => setCurrentLimit(n)}
          />
        </>
      </MainLayOut>
    </>
  );
};

export default MemberPermisionPage;
