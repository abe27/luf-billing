/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, useToast } from "@chakra-ui/react";
import { Button, Input, Modal, Radio, Text } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";

const AddNewUser = ({
  isEdit = false,
  reloadData = false,
  userData = null,
}) => {
  const { data: session } = useSession();
  const inputRef = useRef();
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [company, setCompany] = useState(null);
  const [role, setRole] = useState(null);

  const handleUploadExcelClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    try {
      let files = URL.createObjectURL(e.target.files[0]);
      setImageUrl(files);
    } catch {
      setImageUrl(
        `https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=128&rounded=true&name=${username}`
      );
    }
  };

  // console.dir(process.env.DEFAULT_PASSWORD);

  const handleSuccess = async () => {
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("full_name", fullName);
    formdata.append("email", email);
    formdata.append("company", company);
    formdata.append("password", password);
    formdata.append("role_id", role);
    if (inputRef.current.value) {
      formdata.append(
        "avatar",
        inputRef.current.files[0],
        inputRef.current.value
      );
    }

    let url = `${process.env.API_HOST}/auth/register`;
    let byMethod = "POST";
    var requestOptions = {
      method: byMethod,
      body: formdata,
      redirect: "follow",
    };
    if (isEdit) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", session?.user.accessToken);
      byMethod = "PUT";
      url = `${process.env.API_HOST}/member/${userData?.id}`;
      requestOptions = {
        method: byMethod,
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
    }

    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      toast({
        title: "Alert Message",
        description: res.statusText,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    let txt = "Add New User Success!";
    if (isEdit) {
      txt = "Update Data Success!";
    }

    Swal.fire({
      text: txt,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#19B5FE",
    });
    reloadData();
  };

  const handleClick = () => {
    setVisible(false);
    if (!username) {
      toast({
        title: "Alert Message",
        description: "Please enter your Username?",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!password) {
      toast({
        title: "Alert Message",
        description: "Please enter your Password?",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!fullName) {
      toast({
        title: "Alert Message",
        description: "Please enter Full Name?",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!email) {
      toast({
        title: "Alert Message",
        description: "Please enter E-Mail?",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!company) {
      toast({
        title: "Alert Message",
        description: "Please enter Company name?",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setVisible(true),
      });
      return;
    }

    if (!role) {
      toast({
        title: "Alert Message",
        description: "Please enter Role?",
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

  const fetchPermission = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(`${process.env.API_HOST}/role`, requestOptions);

    if (res.ok) {
      const data = await res.json();
      setRoleData(data.data);
    }
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      setImageUrl(null);
      setUsername(null);
      setFullName(null);
      setEmail(null);
      setCompany(null);
      setRole(null);
      fetchPermission();
      if (userData) {
        setImageUrl(`${process.env.API_PUBLIC}${userData.avatar_url}`);
        setUsername(userData.username);
        setFullName(userData.full_name);
        setEmail(userData.email);
        setCompany(userData.company);
        setRole(userData.role.title);
      }
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  useEffect(() => {
    if (!imageUrl) {
      setImageUrl(
        `https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=128&rounded=true&name=${username}`
      );
    }
  }, [username]);

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg"
      />
      {!isEdit ? (
        <Button
          color="secondary"
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
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          }
          onPress={() => setVisible(true)}
        >
          Add User
        </Button>
      ) : (
        <Button
          size={"xs"}
          color={"primary"}
          auto
          flat
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
          onPress={() => setVisible(true)}
        >
          Edit
        </Button>
      )}
      <Modal
        width="600px"
        preventClose
        blur
        closeButton
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {isEdit ? "Edit User" : "Add User"}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="grid">
            <div className="gird grid-rows-2">
              <div
                className="flex justify-center items-center w-full hover:cursor-pointer"
                onClick={handleUploadExcelClick}
              >
                {/* <Avatar size="2xl" src="https://placehold.co/600x600" /> */}
                <Avatar size="xl" src={imageUrl} />
              </div>
              <div className="flex justify-center mt-2">
                {/* {inputRef?.current?.value ? (
                  <p>{inputRef.current.files[0].name}</p>
                ) : null} */}
                <p className="text-xs">Allow files type png jpg jpeg</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between space-x-4">
              <Input
                fullWidth
                clearable
                label="Username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                fullWidth
                clearable
                label="Password"
                placeholder="Password"
                type={"paassword"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Input
                fullWidth
                clearable
                label="Full Name"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-between space-x-4">
              <Input
                fullWidth
                clearable
                label="E-Mail"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                fullWidth
                clearable
                label="Company"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Radio.Group label="Role" value={role} onChange={setRole}>
                {roleData?.map((i, x) => (
                  <Radio value={i.title} key={x}>
                    <div className="grid grid-rows-2">
                      <span className="text-sm">{i.title}</span>
                      <span className="text-xs">{i.description}</span>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            }
            onPress={() => setVisible(false)}
          >
            Cancel
          </Button>
          <Button
            auto
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
            onPress={handleClick}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewUser;
