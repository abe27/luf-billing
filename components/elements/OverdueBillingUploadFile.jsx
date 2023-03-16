import { Button } from "@nextui-org/react";
import { useRef } from "react";

const OverdueBillingUploadFile = ({ id = null }) => {
  const inputRef = useRef();

  const handleUploadExcelClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {};

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg"
      />
      <Button
        flat
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        }
        onPress={handleUploadExcelClick}
      >
        Upload File
      </Button>
    </>
  );
};

export default OverdueBillingUploadFile;
