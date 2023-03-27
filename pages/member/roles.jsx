/* eslint-disable react-hooks/exhaustive-deps */
import { AddEditRole, MainLayOut } from "@/components";
import Link from "next/link";
import { Grid, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const MemberRolePage = () => {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    console.dir(`${process.env.API_HOST}/role`);
    const res = await fetch(`${process.env.API_HOST}/role`, requestOptions);
    if (res.ok) {
      const obj = await res.json();
      console.dir(obj.data);
      setData(obj.data);
    }

    if (!res.ok) {
    }
  };

  const confirmDelete = (id) => {};

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

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
        <div className="mt-4">
          <Grid.Container gap={2} justify="flex-start">
            {data.map((i) => (
              <Grid xs={4} key={i.id}>
                <div className="card w-full bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex w-full justify-between">
                      <div className="flex justify-start mt-3">
                        <h2 className="text-4xm text-sm">{i.title}</h2>
                      </div>
                      <div className="flex justify-end items-end">
                        <Button
                          light
                          color="error"
                          auto
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 text-rose-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          }
                          onPress={() => confirmDelete(i)}
                        ></Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      Detail: <span className="text-sm">{i.description}</span>
                    </div>
                    <div className="text-gray-400">
                      <span className="text-4xm text-sm font-bold">
                        Permissions
                      </span>
                      <div className="grid grid-rows-2 pl-4">
                        {i.role_detail.map((z) => (
                          <div className="flex justify-start" key={z.id}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4 text-sky-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                              />
                            </svg>
                            <span className="text-sm">
                              {z.permission.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="card-actions justify-end">
                      <AddEditRole
                        isEdit={true}
                        role_id={i.id}
                        token={session?.user.accessToken}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
            <Grid xs={4}>
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
                      className="w-36 h-36 text-indigo-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <div className="card-actions justify-end">
                    <AddEditRole
                      token={session?.user.accessToken}
                      reloadData={() => fetchData()}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid.Container>
        </div>
      </MainLayOut>
    </>
  );
};

export default MemberRolePage;
