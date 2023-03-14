import { useState } from "react";
import {
  Modal,
  Text,
  Input,
  Spacer,
  Button,
  Pagination,
} from "@nextui-org/react";

const EditBilling = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <>
      <Button
        size="xs"
        flat
        color="warning"
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        }
        onPress={handler}
      >Edit</Button>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Edit Billing
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input clearable label="Billing No." placeholder="Billing No." />
          <Input
            clearable
            label="Billing Date"
            type="date"
            placeholder="Billing Date"
          />
          <Input
            clearable
            label="Due Date"
            type="date"
            placeholder="Due Date"
          />
          <Input clearable label="Amount" type="number" placeholder="Amount" />
          <Input clearable label="Vendor Code" placeholder="Vendor Code" />
          <Input clearable label="Vendor Name" placeholder="Vendor Name" />
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Vendor Group</span>
            </label>
            <select className="select select-ghost max-w-xs">
              <option>Grp. A</option>
              <option>Grp. B</option>
              <option>Grp. C</option>
            </select>
          </div>
          <Spacer y={0.5} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={closeHandler}
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
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          >
            Cancel
          </Button>
          <Button
            auto
            onPress={closeHandler}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-device-floppy"
                width="24"
                height="24"
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
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditBilling;
