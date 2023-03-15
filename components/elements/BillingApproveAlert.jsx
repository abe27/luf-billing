import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Modal, Input, Row, Textarea, Button, Text } from "@nextui-org/react";

const BillingApproveAlert = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleSuccess = () => {
    Swal.fire({
      text: "Approved Success!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
    });
  };

  const handlerApprove = () => {
    setVisible(false);
    Swal.fire({
      text: "Would you like to comfirm?",
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
      <Button
        flat
        color="success"
        auto
        size={"xs"}
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
        onPress={handler}
      >
        Approve
      </Button>
      <Modal
        closeButton
        blur
        
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Approve Detail
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Input
              clearable
              fullWidth
              size="lg"
              label="Payment Date"
              placeholder="Payment Date"
              type="date"
            />
          </Row>
          <Row>
            <Textarea
              label="Comment"
              placeholder="Enter your comment here"
              fullWidth={true}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="primary"
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            }
            onPress={handlerApprove}
          >
            Approve
          </Button>
          <Button
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
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            onPress={closeHandler}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BillingApproveAlert;
