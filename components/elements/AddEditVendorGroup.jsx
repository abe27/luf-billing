/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, Input, Modal, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Swal from "sweetalert2/dist/sweetalert2.js";

const AddEditVendorGroup = ({
  isEdit = false,
  vendor = null,
  token,
  reloadData = false,
}) => {
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [slDoc, setSlDoc] = useState([]);
  const [vendorGroup, setVendorGroup] = useState(null);

  const handleSuccess = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", vendorGroup);
    urlencoded.append("description", "-");
    urlencoded.append("documents", slDoc);
    urlencoded.append("is_active", "true");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    let url = `${process.env.API_HOST}/vendor/group`;
    if (isEdit) {
      requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      if (vendor.documents.length > 0) {
        url = `${process.env.API_HOST}/vendor/group/${vendor.documents[0].vendor_group_id}`;
      }
    }

    const res = await fetch(url, requestOptions);

    if (res.ok) {
      Swal.fire({
        text: "Save Success!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      });
      reloadData();
    }

    if (!res.ok) {
      toast({
        title: "Error Message!",
        description: res.error,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
    }
  };

  const handlerSave = () => {
    setVisible(false);
    if (!vendorGroup) {
      toast({
        title: "Warning Message!",
        description: "Please enter vendor group name!",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    Swal.fire({
      text: "Would you like to Confirm?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
      preConfirm: () => handleSuccess(),
    });
  };

  const fetchDocuments = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/document/list`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      setDocuments(data.data);
    }
  };

  const checkSelected = (x) => {
    let doc = slDoc;
    if (doc.indexOf(x) > -1) {
      return true;
    }
    return false;
  };

  const selectDocument = (e, value) => {
    let doc = slDoc;
    if (doc.length > 0) {
      let p = doc.indexOf(value);
      if (p > -1) {
        doc.splice(p, 1);
        setSlDoc(doc);
      } else {
        if (e) {
          setSlDoc([value, ...slDoc]);
        }
      }
    } else {
      if (e) {
        setSlDoc([value]);
      }
    }
  };

  useEffect(() => {
    if (visible) {
      fetchDocuments();
      setSlDoc([]);
      setVendorGroup(null);
      if (vendor) {
        setVendorGroup(vendor.title);
        let v = [];
        vendor.documents.map((i) => v.push(i.document_id));
        setSlDoc(v);
      }
    }
  }, [visible]);
  return (
    <>
      {isEdit ? (
        <Button
          flat
          size="sm"
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          }
          onPress={() => setVisible(true)}
        >
          Edit Vendor
        </Button>
      ) : (
        <Button
          flat
          size="sm"
          color="success"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          }
          onPress={() => setVisible(true)}
        >
          <div className="p-4">New Vendor Group</div>
        </Button>
      )}
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {isEdit ? "Edit Vendor Group" : "Add New Vendor Group"}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-8">
            <div>
              <Input
                fullWidth
                clearable
                label="Group Name"
                placeholder="Group Name"
                value={vendorGroup}
                onChange={(e) => setVendorGroup(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <span className="text-sm">Document List</span>
              <div className="grid mt-2">
                {documents?.map((i, x) => (
                  <div key={x}>
                    <Checkbox
                      value={i.id}
                      size="sm"
                      defaultSelected={checkSelected(i.id)}
                      onChange={(e) => selectDocument(e, i.id)}
                    >
                      <span className="text-sm">{i.title}</span>
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-center space-x-2">
            <Button
              flat
              auto
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
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button
              auto
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
              onPress={handlerSave}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEditVendorGroup;
