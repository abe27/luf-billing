import { useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

const ViewBillingPDF = ({ filename = "example.pdf" }) => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Button
          flat
          color="primary"
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          }
          onPress={handler}
        >
          View File
        </Button>
        <Modal
          scroll
          fullScreen
          closeButton
          blur
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Body>
            <Viewer fileUrl={filename} />
          </Modal.Body>
        </Modal>
      </Worker>
    </>
  );
};

export default ViewBillingPDF;
