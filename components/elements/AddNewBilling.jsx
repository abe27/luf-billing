import { useState } from "react";
import {
  Modal,
  Text,
  Input,
  Spacer,
  Button,
  Pagination,
} from "@nextui-org/react";

const AddNewBilling = () => {
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
        color="warning"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        }
        onPress={handler}
      >
        Add Bill
      </Button>
      <Modal
        closeButton
        preventClose
        
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Add Billing
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

export default AddNewBilling;
