import { Button } from "@nextui-org/react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const VerifyBillingAlert = ({ id, token, reloadData }) => {
  const handleSuccess = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", "Verify");
    urlencoded.append("is_active", "true");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/require/${id}`,
      requestOptions
    );

    if (res.ok) {
      Swal.fire({
        text: "Success Verification!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => reloadData());
    }
  };

  const handleClick = () => {
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
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        }
        onClick={handleClick}
      >
        Verify
      </Button>
    </>
  );
};

export default VerifyBillingAlert;
