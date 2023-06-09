import { useState } from "react";
import {
  Modal,
  Button,
  Text,
  Textarea,
  Row,
  Checkbox,
} from "@nextui-org/react";

let doc = ["Purchase Order", "Text Invoioce/Delivery Order", "Receipt", "Bill"];

const ViewRejectDetail = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <>
      <Button
        flat
        color="error"
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
        View Detail
      </Button>
      <Modal
        closeButton
        blur
        
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add Required
          </Text>
        </Modal.Header>
        <Modal.Body>
          <span className="text-4xm text-bold">Required Documents</span>
          {doc.map((i, x) => (
            <Row key={x}>
              <Checkbox>
                <Text size={14}>{i}</Text>
              </Checkbox>
            </Row>
          ))}
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
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewRejectDetail;
