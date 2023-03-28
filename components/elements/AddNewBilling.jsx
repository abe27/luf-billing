/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Modal, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { DateOnly } from "@/hooks";

const AddNewBilling = ({
  isEdit = false,
  data = {},
  title = "Add New",
  token = null,
  vendorGroup = [],
  reloadData = null,
  color = "secondary",
  size = "sm",
}) => {
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [billingNo, setBillingNo] = useState(null);
  const [billingDate, setBillingDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [vendorCode, setVendorCode] = useState(null);
  const [vendorName, setVendorName] = useState(null);

  const handler = () => setVisible(true);

  const handleSuccess = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("billing_no", billingNo);
    urlencoded.append("billing_date", `${billingDate}T00:00:00.000Z`);
    urlencoded.append("due_date", `${dueDate}T00:00:00.000Z`);
    urlencoded.append("amount", amount);
    urlencoded.append("vendor_code", vendorCode);
    urlencoded.append("vendor_name", vendorName);
    urlencoded.append("detail", "-");
    urlencoded.append("status_id", "Open");
    urlencoded.append("vendor_group_id", selectedVendor);
    urlencoded.append("is_active", "true");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    let url = `${process.env.API_HOST}/billing/list`;
    if (isEdit) {
      url = `${process.env.API_HOST}/billing/list/${data.id}`;
      requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
    }

    const res = await fetch(url, requestOptions);

    if (res.ok) {
      Swal.fire({
        text: isEdit ? "Update Success!" : "Save Success!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      });
      reloadData();
    }

    if (!res.ok) {
      console.dir(res.error);
      reloadData();
    }
  };

  const hangeSaveData = () => {
    setVisible(false);
    if (!billingNo) {
      toast({
        title: "Billing No is required",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!billingDate) {
      toast({
        title: "Billing date is required",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!dueDate) {
      toast({
        title: "Due Date is required",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!amount) {
      toast({
        title: "Amount is required",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }
    if (!vendorCode) {
      toast({
        title: "Vendor Code is required",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!vendorName) {
      toast({
        title: "Vendor Name is required",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!selectedVendor || selectedVendor === "-") {
      toast({
        title: "Vendor Group is required",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    Swal.fire({
      text: "Would you like to Confirm?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
      preConfirm: () => handleSuccess(),
    });
  };

  useEffect(() => {
    if (visible) {
      let d = DateOnly(new Date());
      setBillingDate(d);
      setDueDate(d);
      setSelectedVendor("-");
      setBillingNo(null);
      setAmount(null);
      setVendorCode(null);
      setVendorName(null);
      if (isEdit) {
        setBillingDate(DateOnly(data.billing_date));
        setDueDate(DateOnly(data.due_date));
        setSelectedVendor(data.vendor_group.id);
        setBillingNo(data.billing_no);
        setAmount(data.amount);
        setVendorCode(data.vendor_code);
        setVendorName(data.vendor_name);
      }
    }
  }, [visible]);

  return (
    <>
      <Button
        flat
        color={color}
        auto
        size={size}
        icon={
          isEdit ? (
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
          ) : (
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
          )
        }
        onPress={handler}
      >
        {title}
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
              {title}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            label="Billing No."
            placeholder="Billing No."
            value={billingNo}
            onChange={(e) => setBillingNo(e.target.value)}
          />
          <div className="flex justify-start space-x-4">
            <Input
              fullWidth
              clearable
              label="Billing Date"
              type="date"
              placeholder="Billing Date"
              value={billingDate}
              onChange={(e) => setBillingDate(e.target.value)}
            />
            <Input
              fullWidth
              clearable
              label="Due Date"
              type="date"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <Input
            fullWidth
            clearable
            label="Amount"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex justify-start space-x-4">
            <Input
              fullWidth
              clearable
              label="Vendor Code"
              placeholder="Vendor Code"
              value={vendorCode}
              onChange={(e) => setVendorCode(e.target.value)}
            />
            <Input
              fullWidth
              clearable
              label="Vendor Name"
              placeholder="Vendor Name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
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
              <option value={`-`}>-</option>
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
            onPress={hangeSaveData}
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
