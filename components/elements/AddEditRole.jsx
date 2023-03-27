/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";

const AddEditRole = ({
  isEdit = false,
  role_id = null,
  token = null,
  reloadData = null,
}) => {
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [permissionData, setPermissionData] = useState([]);
  const [permisions, setPermissions] = useState([]);
  const [txtPermission, setTxtPermission] = useState(null);
  const [txtDescription, setTxtDescription] = useState(null);

  const handleSuccess = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      title: txtPermission,
      description: txtDescription,
      is_active: true,
      role_detail: permisions,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await fetch(`${process.env.API_HOST}/role`, requestOptions);
    if (res.ok) {
      Swal.fire({
        text: "Save Success!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      });
      reloadData();
    }
  };

  const handlerSave = () => {
    console.dir(permisions);
    setVisible(false);
    if (!txtPermission) {
      toast({
        title: "Warning Message!",
        description: "Please enter a title.",
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

  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/permission`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      console.dir(data.data);
      setPermissionData(data.data);
    }
  };

  const setCheckPermission = (id, type, checked) => {
    let p = { id: id, type: type, checked: checked };
    let doc = permisions.find((i) => i.id === id && i.type === type);
    if (doc) {
      doc.checked = checked;
      setPermissions(Object.assign(permisions, doc));
    } else {
      setPermissions([p, ...permisions]);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchData();
      setPermissions([]);
      setTxtPermission(null);
      setTxtDescription(null);
      if (isEdit) {
        setTxtPermission(null);
        setTxtDescription(null);
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
          Edit Role
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
          New Role
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
            {isEdit ? "Edit Role" : "Add New Role"}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-8">
            <div>
              <Input
                fullWidth
                clearable
                label="Role Name"
                placeholder="Role Name"
                value={txtPermission}
                onChange={(e) => setTxtPermission(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Textarea
                fullWidth
                clearable
                label="Detail"
                placeholder="Detail"
                value={txtDescription}
                onChange={(e) => setTxtDescription(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <span className="text-sm">Role Permisions</span>
              <div className="grid mt-2">
                {permissionData.map((i) => (
                  <div className="flex justify-between w-full mt-2" key={i.id}>
                    <div className="flex justify-start w-40">
                      <span className="text-sm">{i.title}</span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Checkbox
                        defaultSelected={i.read}
                        size="sm"
                        onChange={(e) => setCheckPermission(i.id, "read", e)}
                      >
                        <span className="text-sm">Read</span>
                      </Checkbox>
                      <Checkbox
                        defaultSelected={i.write}
                        size="sm"
                        onChange={(e) => setCheckPermission(i.id, "write", e)}
                      >
                        <span className="text-sm">Write</span>
                      </Checkbox>
                      <Checkbox
                        defaultSelected={i.create}
                        size="sm"
                        onChange={(e) => setCheckPermission(i.id, "create", e)}
                      >
                        <span className="text-sm">Create</span>
                      </Checkbox>
                    </div>
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

export default AddEditRole;
