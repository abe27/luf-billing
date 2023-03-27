/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Text, Input, Row, Textarea } from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AddOrUpdateMaster = ({
  flat = false,
  isEdit = false,
  color = "secondary",
  size = "sm",
  reloadData = false,
  token = null,
  obj = {},
}) => {
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const handleSave = async () => {
    setVisible(false);

    if (!title) {
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

    if (!description) {
      toast({
        title: "Warning Message!",
        description: "Please enter a description.",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", title);
    urlencoded.append("description", description);
    urlencoded.append("is_active", "true");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    let url = `${process.env.API_HOST}/document/list`;

    if (isEdit) {
      requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      url = `${process.env.API_HOST}/document/list/${obj.id}`;
    }

    const res = await fetch(url, requestOptions);

    if (res.ok) {
      setVisible(false);
      toast({
        title: "Success Message!",
        description: "Document added successfully.",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => {
          reloadData();
        },
      });
    }

    if (!res.ok) {
      setVisible(false);
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

  useEffect(() => {
    if (visible) {
      if (isEdit) {
        setTitle(obj.title);
        setDescription(obj.description);
      } else {
        setTitle(null);
        setDescription(null);
      }
    }
  }, [visible]);

  return (
    <>
      <Button
        flat={flat}
        color={color}
        size={size}
        icon={
          !isEdit ? (
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          )
        }
        onClick={() => setVisible(true)}
      >
        {isEdit ? "Edit" : "Add New"}
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
            {isEdit ? "Update" : "Add New"}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            fullWidth
            size="sm"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            clearable
            fullWidth
            size="sm"
            placeholder="Enter Detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            size={"sm"}
            auto
            flat
            color="error"
            onPress={() => setVisible(false)}
          >
            Cancel
          </Button>
          <Button size={"sm"} auto onPress={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddOrUpdateMaster;
