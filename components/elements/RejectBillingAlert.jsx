import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  Textarea,
  Row,
  Checkbox,
} from "@nextui-org/react";
import Swal from "sweetalert2/dist/sweetalert2.js";

const RejectBillingAlert = ({
  id,
  docs = [],
  token = null,
  reloadData = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectRequire, setSelectRequire] = useState([]);
  const [remark, setRemark] = useState([]);

  const closeHandler = () => {
    setVisible(false);
    console.dir(selectRequire);
  };

  const handleSuccess = async () => {
    console.dir(selectRequire);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      remark: remark,
      reason: selectRequire,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/billing/require/${id}`,
      requestOptions
    );

    if (res.ok) {
      Swal.fire({
        text: "Reject Success!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => reloadData());
    }
  };

  const handlerReject = () => {
    setVisible(false);
    if (selectRequire.length <= 0) {
      Swal.fire({
        text: "Please Select Document Requirements!",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => setVisible(true));
      return;
    }

    if (remark.length <= 0) {
      Swal.fire({
        text: "Please Enter your comment!",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#19B5FE",
      }).then((r) => setVisible(true));
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

  const selectDocument = (id, e) => {
    let doc = { id: id, check: e };
    if (selectRequire.length > 0) {
      let check = selectRequire.filter((x) => x.id === id);
      if (check[0]) {
        setSelectRequire((prevState) => {
          const newItems = [...prevState];
          newItems.map((item) => {
            if (item.id === id) {
              item.check = e;
            }
            return item;
          });
          return newItems;
        });
      } else {
        setSelectRequire([doc, ...selectRequire]);
      }
    } else {
      setSelectRequire([doc]);
    }
  };

  useEffect(() => {
    if (visible) {
      setSelectRequire([]);
      setRemark("");
    }
  }, [visible]);
  return (
    <>
      <Button
        flat
        color="error"
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
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        }
        onPress={() => setVisible(true)}
      >
        Reject
      </Button>
      <Modal closeButton blur open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add Required
          </Text>
        </Modal.Header>
        <Modal.Body>
          <span className="text-4xm text-bold">Required Documents</span>
          {docs.map((i, x) => (
            <Row key={x}>
              <Checkbox value={i.id} onChange={(e) => selectDocument(i.id, e)}>
                <Text size={14}>{i.title}</Text>
              </Checkbox>
            </Row>
          ))}
          <Row>
            <Textarea
              label="Comment"
              placeholder="Enter your comment here"
              fullWidth={true}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
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
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            }
            onPress={handlerReject}
          >
            Reject
          </Button>
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
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RejectBillingAlert;
