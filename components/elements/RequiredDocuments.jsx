/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useEffect, useRef, useState } from "react";

const ShowDocument = ({ step = false, data, id, token, removeAt = null }) => {
  const [doc, setDoc] = useState({});

  const deleteFile = async (doc_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/upload/${doc_id}`,
      requestOptions
    );

    if (res.ok) {
      removeAt(doc_id);
    }
  };

  useEffect(() => {
    if (step) {
      let obj = data.filter((x) => x.id === id);
      setDoc(obj[0]);
    } else {
      let obj = data.filter((x) => x.document_id === id);
      setDoc(obj[0]);
    }
    // console.dir(data);
  }, [data]);
  return (
    <>
      {doc ? (
        <div className="w-full flex justify-between bg-gray-50 pl-6 pb-2 mb-4">
          <div className="flex justify-start mt-2">
            <span className="text-sm">{doc.file_name}</span>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              size={"xs"}
              flat
              auto
              light
              color={"error"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              }
              onPress={() => deleteFile(step ? doc.doc_id : doc.id)}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const RequiredDocuments = ({
  billing_id = null,
  docs = [],
  fileType = [],
  status = "Open",
  reloadData = null,
  token = null,
}) => {
  const inputRef = useRef();
  const router = useRouter();
  const [selectDoc, setSelectDoc] = useState({});
  const [selectedFile, setSelectedFile] = useState([]);

  const handleSuccess = async () => {
    // Update Step to Send file and Status to Process
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("status", "On Process");
    urlencoded.append("step", "Send File");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/list/${billing_id}`,
      requestOptions
    );

    if (res.ok) {
      Swal.fire({
        text: `Save Success!`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => {
        reloadData();
        router.back();
      });
    }
  };

  const handlerConfirm = () => {
    if (docs.length <= 0) {
      if (selectedFile.length < fileType.length) {
        Swal.fire({
          text: `Please upload document before save data!`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#19B5FE",
        });
        return;
      }
    }
    Swal.fire({
      text: `Would you like to confirm save data?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
      preConfirm: () => handleSuccess(),
    });
  };

  const uploadBillingDocument = (obj) => {
    setSelectDoc(obj);
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    if (inputRef.current.files) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", token);

      var formdata = new FormData();
      formdata.append("billing_id", billing_id);
      formdata.append("document_id", selectDoc.id);
      formdata.append(
        "file",
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
        `${process.env.API_HOST}/billing/upload`,
        requestOptions
      );

      if (res.ok) {
        const docData = await res.json();
        let doc = {
          id: selectDoc.id,
          doc_id: docData.data.id,
          title: selectDoc.title,
          file_name: inputRef.current.files[0].name,
          file_size: inputRef.current.files[0].size,
          file_type: inputRef.current.files[0].type,
          file_path: inputRef.current.value,
          files: inputRef.current.files[0],
        };

        if (selectedFile.length > 0) {
          let obj = selectedFile.filter((x) => x.id === doc.id);
          if (obj.length > 0) {
            setSelectedFile((prevState) => {
              const newItems = [...prevState];
              if (x.id === doc.id) {
                newItems[e.target.id] = doc;
              }
              return newItems;
            });
          } else {
            setSelectedFile([doc, ...selectedFile]);
          }
        } else {
          setSelectedFile([doc]);
        }
        reloadData();
        inputRef.current.value = "";
      }
    }
  };

  const removeDoc = (doc_id) => {
    let obj = [];
    selectedFile.map((x) => {
      if (x.doc_id !== doc_id) {
        obj.push(x);
      }
    });
    setSelectedFile(obj);
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
      />
      <div className="grid rounded shadow pl-4 pr-4 pt-4 bg-white mt-2">
        <span className="text-4xm">Required documents</span>
        {status !== "Approved" ? (
          fileType?.map((i, x) => (
            <div key={i.id}>
              <div className="grid pl-6 pr-6 pb-2">
                <p className="text-sm">
                  {i.title} <span className="text-rose-600">*</span>
                </p>
                <div className="w-full border border-dashed border-indigo-200 flex justify-center hover:cursor-pointer">
                  <Button
                    className="w-full"
                    size={"xs"}
                    light
                    color="primary"
                    auto
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                        />
                      </svg>
                    }
                    onPress={() => uploadBillingDocument(i)}
                  >
                    {docs.length > 0 ? "Change File" : "Choose File"}
                  </Button>
                </div>
              </div>
              {docs.length > 0 ? (
                <ShowDocument
                  data={docs}
                  id={i.id}
                  token={token}
                  removeAt={removeDoc}
                />
              ) : (
                <ShowDocument
                  step={false}
                  data={selectedFile}
                  id={i.id}
                  token={token}
                  removeAt={removeDoc}
                />
              )}
            </div>
          ))
        ) : (
          <>
            {fileType?.map((i, x) => (
              <div className="grid mt-2 mb-4" key={x}>
                <span className="text-sm">{i}</span>
                <div className="flex justify-between bg-gray-50 p-2">
                  <div>File xxx.pdf</div>
                  <div>123kb</div>
                </div>
              </div>
            ))}
          </>
        )}
        <div className="flex justify-center space-x-4 mb-4 mt-4">
          <Button
            size={"sm"}
            auto
            flat
            color="error"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            }
            onPress={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            size={"sm"}
            auto
            color="primary"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-device-floppy"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M14 4l0 4l-6 0l0 -4"></path>
              </svg>
            }
            onPress={handlerConfirm}
          >
            {status === "Open" ? "Save" : "Resend"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default RequiredDocuments;
