import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2/dist/sweetalert2.js";

const ConfirmDialog = ({
  flat = true,
  auto = true,
  size = "xs",
  color = "error",
  title = "Delete",
  id = null,
  reloadData = false,
}) => {
  const { data: session } = useSession();
  const handleSuccess = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/member/${id}`,
      requestOptions
    );

    if (res.ok) {
      Swal.fire({
        text: `${title} Success!`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => reloadData());
      return;
    }

    if (!res.ok) {
      Swal.fire({
        text: `${title} Failed!`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => reloadData());
    }
  };

  const handlerConfirm = () => {
    Swal.fire({
      text: `Would you like to confirm ${title} ${id}?`,
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
