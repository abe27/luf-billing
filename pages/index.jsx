/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import {
  MainLayOut,
  AddNewBilling,
  EditBilling,
  ConfirmDelete,
} from "@/components";
import { Input, Button, Pagination } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { DateString } from "@/hooks";
import Swal from "sweetalert2/dist/sweetalert2.js";

const IndexPage = () => {
  const inputRef = useRef();
  const { data: session } = useSession();
  const toast = useToast();
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(2);
  const [vendorGroup, setVendorGroup] = useState([]);
  const [selectVendorGroup, setSelectVendorGroup] = useState(null);
  const [invData, setInvData] = useState([]);
  const [billing_no, setBillingNo] = useState(null);
  const [billing_date, setBillingDate] = useState(null);

  const fetchData = async () => {
    setInvData([]);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/list?billing_no=${billing_no}&billing_date=${billing_date}&vendor_group=${selectVendorGroup}`,
      requestOptions
    );

    if (res.ok) {
      let doc = await res.json();
      setInvData(doc.data);
      setTotalPage(Math.ceil(doc.data.length / currentLimit));
    }
    inputRef.current.value = null;
  };

  const handleUploadExcelClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var formdata = new FormData();
    formdata.append(
      "filename",
      inputRef.current.files[0],
      inputRef.current.value
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/import`,
      requestOptions
    );

    if (res.ok) {
      Swal.fire({
        text: "Upload successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      });
      fetchData();
    }

    if (!res.ok) {
      Swal.fire({
        text: "Upload failed",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      });
      fetchData();
    }
  };

  const fetchVendorGroup = async () => {
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

    if (!res.ok) {
      toast({
        title: "Error!",
        description: res.error,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
    }

    if (res.ok) {
      const data = await res.json();
      setVendorGroup(data.data);
    }
  };

  const confirmDelete = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/list/${id}`,
      requestOptions
    );

    if (res.ok) {
      Swal.fire({
        text: "Delete successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => fetchData());
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchVendorGroup();
      fetchData();
    }
  }, [
    session?.user,
    currentLimit,
    billing_no,
    billing_date,
    selectVendorGroup,
  ]);

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".xls,.csv"
      />
      <MainLayOut>
        <span className="text-4xm font-bold">Import Data Billing</span>
        <div className="mt-4 rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div className="flex justify-start space-x-4">
              <Input
                clearable
                placeholder="Billing No."
                value={billing_no}
                onChange={(e) => setBillingNo(e.target.value)}
              />
              <Input
                width="186px"
                type="date"
                placeholder="Billing Date"
                value={billing_date}
                onChange={(e) => setBillingDate(e.target.value)}
              />
              <select
                className="select select-ghostv max-w-xs bg-gray-100"
                defaultValue={selectVendorGroup}
                onchange={(e) => setSelectVendorGroup(e.target.value)}
              >
                <option disabled value={"-"}>
                  Vendor Group
                </option>
                {vendorGroup.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end z-0">
              <div className="flex justify-end space-x-4">
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
                <AddNewBilling
                  token={session?.user.accessToken}
                  vendorGroup={vendorGroup}
                  reloadData={fetchData}
                />
                <Button
                  flat
                  color="success"
                  auto
                  size={"sm"}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-file-spreadsheet"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                      <path d="M8 11h8v7h-8z"></path>
                      <path d="M8 15h8"></path>
                      <path d="M11 11v7"></path>
                    </svg>
                  }
                  onClick={handleUploadExcelClick}
                >
                  Import Excel
                </Button>
              </div>
            </div>
          </div>
          {invData.length > 0 && (
            <>
              <div className="mt-4">
                <table className="table table-hover table-compact w-full">
                  <thead>
                    <tr>
                      <th className="normal-case">No.</th>
                      <th className="normal-case">Billing No.</th>
                      <th className="normal-case">Billing Date</th>
                      <th className="normal-case">Due Date</th>
                      <th className="normal-case">Amount</th>
                      <th className="normal-case">Vendor Code</th>
                      <th className="normal-case">Vendor Name</th>
                      <th className="normal-case">Vendor Group</th>
                      <th className="normal-case">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invData.map((i, x) => (
                      <tr key={i.id}>
                        <td>{x + 1}</td>
                        <td>{i.billing_no}</td>
                        <td>{DateString(i.billing_date)}</td>
                        <td>{DateString(i.due_date)}</td>
                        <td>{i.amount.toLocaleString()}</td>
                        <td>{i.vendor_code}</td>
                        <td>{i.vendor_name}</td>
                        <td>{i.vendor_group.title}</td>
                        <td>
                          <div className="flex justify-start space-x-2">
                            <AddNewBilling
                              isEdit={true}
                              title="Edit"
                              color="warning"
                              size="xs"
                              data={i}
                              vendorGroup={vendorGroup}
                              token={session?.user.accessToken}
                              reloadData={fetchData}
                            />
                            <ConfirmDelete
                              id={i.id}
                              isConfirm={confirmDelete}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPage > 2 ? (
                <div className="mt-4 flex justify-between">
                  <div className="flex justify-start">
                    <select
                      className="select select-bordered select-sm w-full max-w-xs"
                      value={currentLimit}
                      onChange={(e) => setCurrentLimit(e.target.value)}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <Pagination total={totalPage} initialPage={1} />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </MainLayOut>
    </>
  );
};

export default IndexPage;
