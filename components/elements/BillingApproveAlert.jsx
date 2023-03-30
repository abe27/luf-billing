/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Modal, Input, Row, Textarea, Button, Text } from "@nextui-org/react";

const BillingApproveAlert = ({ id, token, reloadData = false }) => {
  const [visible, setVisible] = useState(false);
  const [paymentDate, setPaymentDate] = useState(null);
  const [details, setDetails] = useState(null);

  const handleSuccess = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("payment_date", `${paymentDate}T00:00:00.000Z`);
    urlencoded.append("detail", details.replace("null", "-"));
    urlencoded.append("status_id", "Approved");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/approve/${id}`,
      requestOptions
    );

    if (res.ok) {
      Swal.fire({
        text: "Approved Success!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => {
        setVisible(false);
        reloadData();
      });
    }

    if (!res.ok) {
      Swal.fire({
        text: res.statusText,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => {
        setVisible(false);
      });
    }
  };

  const handlerApprove = () => {
    setVisible(false);
    if (!paymentDate) {
      Swal.fire({
        text: "Please select payment date!",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => setVisible(true));
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
      setPaymentDate("");
      setDetails("-");
    }
  }, [visible]);

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
        onPress={() => setVisible(true)}
      >
        Approve
      </Button>
      <Modal closeButton blur open={visible} onClose={() => setVisible(false)}>
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
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </Row>
          <Row>
            <Textarea
              label="Comment"
              placeholder="Enter your comment here"
              fullWidth={true}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
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
            onPress={() => setVisible(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BillingApproveAlert;
