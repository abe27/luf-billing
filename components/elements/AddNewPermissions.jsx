/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Modal,
  useModal,
  Input,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Swal from "sweetalert2/dist/sweetalert2.js";

const AddNewPermissions = ({
  title = "Add Permissions",
  isEdit = false,
  flat = true,
  color = "error",
  auto = true,
  size = "sm",
  propData = null,
  token = null,
  reloadData = false,
}) => {
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const handleSuccess = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", name);
    urlencoded.append("description", description);
    urlencoded.append("read", "false");
    urlencoded.append("write", "false");
    urlencoded.append("create", "false");
    urlencoded.append("is_active", "true");

    console.dir(urlencoded);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    let url = `${process.env.API_HOST}/permission`;
    if (isEdit) {
      url = `${process.env.API_HOST}/permission/${propData.id}`;
      requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
    }

    const res = await fetch(url, requestOptions);
    if (res.ok) {
      Swal.fire({
        text: "Save Success!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => reloadData());
    }
  };

  const handlerSave = () => {
    setVisible(false);
    if (!name) {
      toast({
        title: "Warning Message!",
        description: "Please enter a name?",
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

  useEffect(() => {
    if (visible) {
      setName(null);
      setDescription(null);
      if (isEdit) {
        setName(propData.title);
        setDescription(propData.description);
      }
    }
  }, [visible]);

  return (
    <>
      <Button
        flat={flat}
        color={color}
        auto={auto}
        size={size}
        icon={
          isEdit ? (
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
          ) : (
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
          )
        }
        onPress={() => setVisible(true)}
      >
        {title}
      </Button>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {isEdit ? "Edit Permision" : "Add New Permision"}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-8">
            <div>
              <Input
                fullWidth
                clearable
                label="Permission"
                placeholder="Permission"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Textarea
                fullWidth
                clearable
                label="Detail"
                placeholder="Detail"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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

export default AddNewPermissions;
