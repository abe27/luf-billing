import { Button } from "@nextui-org/react";
import Swal from "sweetalert2/dist/sweetalert2.js";

const ConfirmDelete = ({
  light = false,
  id = null,
  title = "Delete",
  text = "Do you want to delete this?",
  flat = true,
  color = "error",
  size = "xs",
  isConfirm = false,
}) => {
  const handlerConfirm = () => {
    Swal.fire({
      text: text,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
      preConfirm: () => isConfirm(id),
    });
  };

  return (
    <>
      <Button
        light={light}
        auto
        flat={flat}
        color={color}
        size={size}
        onPress={handlerConfirm}
      >
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
        {title}
      </Button>
    </>
  );
};

export default ConfirmDelete;
