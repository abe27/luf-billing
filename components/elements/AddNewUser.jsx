import { useRef, useState } from "react";
import { Modal, Button, Text, Input, Radio } from "@nextui-org/react";
import { Avatar } from "@chakra-ui/react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const AddNewUser = ({ isEdit = false }) => {
  const inputRef = useRef();
  const [visible, setVisible] = useState(false);

  const handleUploadExcelClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {};

  const handleSuccess = () => {
    Swal.fire({
      text: "Add New User Success!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
    });
  };

  const handleClick = () => {
    setVisible(false);
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

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg"
      />
      {!isEdit ? (
        <Button
          color="secondary"
          auto
          size={"sm"}
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
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          }
          onClick={() => setVisible(true)}
        >
          Add User
        </Button>
      ) : (
        <Button
          size={"xs"}
          color={"primary"}
          auto
          flat
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
          onClick={() => setVisible(true)}
        >
          Edit
        </Button>
      )}
      <Modal
        preventClose
        blur
        closeButton
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {isEdit ? "Edit User": "Add User"}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="grid">
            <div className="gird grid-rows-2">
              <div
                className="flex justify-center items-center w-full hover:cursor-pointer"
                onClick={handleUploadExcelClick}
              >
                <Avatar size="2xl" src="https://placehold.co/600x600" />
              </div>
              <div className="flex justify-center mt-2">
                <p className="text-xs">Allow files type png jpg jpeg</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between space-x-4">
              <Input
                fullWidth
                clearable
                label="Username"
                placeholder="Username"
              />
              <Input
                fullWidth
                clearable
                label="Full Name"
                placeholder="Full Name"
              />
            </div>
            <div className="mt-4">
              <Input fullWidth clearable label="E-Mail" placeholder="E-Mail" />
            </div>
            <div className="mt-4">
              <Input
                fullWidth
                clearable
                label="Company"
                placeholder="Company"
              />
            </div>
            <div className="mt-4">
              <Radio.Group label="Role" defaultValue="Admin">
                <Radio value="Admin">
                  <div className="grid grid-rows-2">
                    <span className="text-sm font-bold">Administrator</span>
                    <span className="text-xs">
                      The accountant handlers everything of the system.
                    </span>
                  </div>
                </Radio>
                <Radio value="Vendor">
                  <div className="grid grid-rows-2">
                    <span className="text-sm font-bold">Vendor</span>
                    <span className="text-xs">Vendor upload files.</span>
                  </div>
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
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
            onPress={handleClick}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewUser;
