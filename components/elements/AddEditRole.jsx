import {
  Button,
  Modal,
  useModal,
  Text,
  Input,
  Checkbox,
} from "@nextui-org/react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const AddEditRole = ({ isEdit = false, role_id = null }) => {
  const { setVisible, bindings } = useModal();

  const handleSuccess = () => {
    Swal.fire({
      text: "Save Success!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
    });
  }

  const handlerSave = () => {
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
  }
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
      <Modal closeButton preventClose {...bindings}>
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
              />
            </div>
            <div className="mt-4">
              <Input fullWidth clearable label="Detail" placeholder="Detail" />
            </div>
            <div className="mt-4">
              <span className="text-sm">Role Permisions</span>
              <div className="grid mt-2">
                <div className="flex w-full">
                  <div className="w-40">
                    <span className="text-sm">Administrator Access</span>
                  </div>
                  <div>
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Select All</span>
                    </Checkbox>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <div className="flex justify-start w-40">
                    <span className="text-sm">Billing Monitor</span>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Read</span>
                    </Checkbox>
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Write</span>
                    </Checkbox>
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Create</span>
                    </Checkbox>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <div className="flex justify-start w-40">
                    <span className="text-sm">Overdue Billing</span>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Read</span>
                    </Checkbox>
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Write</span>
                    </Checkbox>
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Create</span>
                    </Checkbox>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <div className="flex justify-start w-40">
                    <span className="text-sm">User Manangement</span>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Read</span>
                    </Checkbox>
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Write</span>
                    </Checkbox>
                    <Checkbox defaultSelected size="sm">
                      <span className="text-sm">Create</span>
                    </Checkbox>
                  </div>
                </div>
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
