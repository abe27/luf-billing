/* eslint-disable react-hooks/exhaustive-deps */
import { AddEditVendorGroup, MainLayOut } from "@/components";
import { useToast } from "@chakra-ui/react";
import { Grid, Button } from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";

const MemberVendorGroupPage = () => {
  const toast = useToast();
  const { data: session } = useSession();
  const [vendor, setVendor] = useState([]);

  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/vendor/group`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      console.dir(data.data);
      setVendor(data.data);
    }

    if (!res.ok) {
      toast({
        title: `Error Message`,
        description: res.error,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    }
  };

  const isConfirm = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/vendor/group/${id}`,
      requestOptions
    );

    if (res.ok) {
      Swal.fire({
        text: `Delete Success!`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => fetchData());
    }
  };

  const confirmDelete = (i) => {
    Swal.fire({
      text: `Do you want delete ${i.title}?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
      confirmButtonColor: "#19B5FE",
      preConfirm: () => isConfirm(i.id),
    });
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);
  return (
    <>
      <MainLayOut title="Management User Roles">
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/monitor`}>User Management</Link>
          </span>
          <span className="text-4xm font-bold">/</span>
          <span className="text-4xm text-gray-500">Vendor Group</span>
        </div>
        <div className="mt-4">
          <Grid.Container gap={2} justify="flex-start">
            {vendor?.map((i, x) => (
              <Grid xs={4} key={x}>
                <div className="card w-full bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex justify-between">
                      <div className="flex justify-start mt-3">
                        <h2 className="text-4xm text-sm">{i.title}</h2>
                      </div>
                      <div className="flex justify-end">
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
                    <div className="text-gray-400 text-sm">
                      Detail:{" "}
                      <span className="text-sm font-bold">{i.description}</span>
                    </div>
                    <div className="text-gray-400">
                      <span className="text-sm">Document List</span>
                      <div className="grid grid-rows-2 pl-4 pt-2">
                        {i.documents?.map((a, b) => (
                          <div className="flex justify-start" key={b}>
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
                            <span className="text-xs">{a.document.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="card-actions justify-end">
                      <AddEditVendorGroup
                        isEdit={true}
                        vendor={i}
                        token={session?.user.accessToken}
                        reloadData={fetchData}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
            <Grid xs={4}>
              <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="text-4xm textw-sm">Add New Role</h2>
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
                    <AddEditVendorGroup
                      token={session?.user.accessToken}
                      reloadData={fetchData}
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

export default MemberVendorGroupPage;
