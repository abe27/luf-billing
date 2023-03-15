import { Button } from "@nextui-org/react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const ConfirmDialog = ({
  flat = true,
  auto = true,
  size = "xs",
  color = "error",
  title = "Delete",
  id=null
}) => {

  const handleSuccess = () => {
    Swal.fire({
      text: "Delete Success!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
    });
  }

  const handlerConfirm = () => {
    Swal.fire({
      text: `Would you like to comfirm delete ${id}?`,
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
      <Button
        flat={flat}
        size={size}
        color={color}
        auto={auto}
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
        onPress={handlerConfirm}
      >
        {title}
      </Button>
    </>
  );
};

export default ConfirmDialog;
