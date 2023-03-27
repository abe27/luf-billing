import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

const RequiredDocuments = ({
  fileType = [],
  title = "Choose File",
  status = "Open",
}) => {
  const router = useRouter();

  const handleSuccess = () => {
    Swal.fire({
      text: `Save Success!`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
    });
  };

  const handlerConfirm = () => {
    Swal.fire({
      text: `Would you like to confirm save data?`,
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
      <div className="grid rounded shadow pl-4 pr-4 pt-4 bg-white mt-2">
        <span className="text-4xm">Required documents</span>
        {status !== "Approved" ? (
          fileType?.map((i, x) => (
            <div className="grid pl-6 pr-6 pb-2" key={x}>
              <p className="text-sm">
                {i} <span className="text-rose-600">*</span>
              </p>
              <div className="w-full border border-dashed border-indigo-200 flex justify-center">
                <Button
                  light
                  color="primary"
                  auto
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                      />
                    </svg>
                  }
                >
                  {title}
                </Button>
              </div>
              <div className="w-full flex justify-between bg-gray-50">
                <div className="flex justify-start mt-2">
                  <span className="text-sm">Filename.PDF</span>
                </div>
                <div className="flex justify-end">
                  <Button
                    auto
                    light
                    color={"error"}
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            {fileType?.map((i, x) => (
              <div className="grid mt-2 mb-4" key={x}>
                <span className="text-sm">{i}</span>
                <div className="flex justify-between bg-gray-50 p-2">
                  <div>File xxx.pdf</div>
                  <div>123kb</div>
                </div>
              </div>
            ))}
          </>
        )}
        <div className="flex justify-center space-x-4 mb-4">
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
            onPress={() => router.back()}
          >
            Cancel
          </Button>
          {status !== "Approved" ? (
            <Button
              auto
              color="primary"
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
              onPress={handlerConfirm}
            >
              Save
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default RequiredDocuments;
