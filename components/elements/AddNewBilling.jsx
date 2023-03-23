/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Modal, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

const AddNewBilling = () => {
  const { data: session } = useSession();
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [vendorGroup, setVendorGroup] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("-");

  const handler = () => setVisible(true);

  const fetchVendorGroup = async () => {
    setVendorGroup([]);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/vendor/group`,
      requestOptions
    );

    if (!res.ok) {
      toast({
        title: "Error!",
        description: res.error,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
    }

    if (res.ok) {
      const data = await res.json();
      console.dir(data);
      setVendorGroup(data.data);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchVendorGroup();
    }
  }, [visible]);

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
        onClose={() => setVisible(false)}
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
          <div className="flex justify-start space-x-4">
            <Input
              fullWidth
              clearable
              label="Billing Date"
              type="date"
              placeholder="Billing Date"
            />
            <Input
              fullWidth
              clearable
              label="Due Date"
              type="date"
              placeholder="Due Date"
            />
          </div>
          <Input
            fullWidth
            clearable
            label="Amount"
            type="number"
            placeholder="Amount"
          />
          <div className="flex justify-start space-x-4">
            <Input
              fullWidth
              clearable
              label="Vendor Code"
              placeholder="Vendor Code"
            />
            <Input
              fullWidth
              clearable
              label="Vendor Name"
              placeholder="Vendor Name"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Vendor Group</span>
            </label>
            <select
              className="select select-ghost max-w-xs"
              defaultValue={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
            >
              <option value={"-"}>-</option>
              {vendorGroup.map((i, x) => (
                <option key={x} value={i.id}>
                  {i.title}
                </option>
              ))}
            </select>
          </div>
          <Spacer y={0.5} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => setVisible(false)}
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
            onPress={() => {}}
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
