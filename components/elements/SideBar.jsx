import Link from "next/link";
import { useRouter } from "next/router";
import { Radio, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

/* eslint-disable jsx-a11y/role-supports-aria-props */
const navbarLink = [
  {
    id: 0,
    title: "Import Data Billing",
    name: "index",
    href: "/",
  },
  {
    id: 1,
    title: "Billing Monitor",
    name: "monitor",
    href: "/monitor",
  },
  {
    id: 2,
    title: "Billing Report",
    name: "report",
    href: "/report",
  },
  {
    id: 3,
    title: "User Manangement",
    name: "member",
    href: "/member",
  },
];

const SideBar = () => {
  const router = useRouter();
  const [memberMenu, setMemberMenu] = useState("u");
  const [active, setActive] = useState(false);
  const NavClass = (href) => {
    if (router.pathname.substring(0, 3) === href.substring(0, 3)) {
      return "items-center w-full bg-gray-200 rounded-lg cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5 text-indigo-700 focus:text-indigo-700 focus:outline-none";
    }
    return "items-center w-full hover:bg-gray-200 hover:rounded-lg cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none";
  };

  useEffect(() => {
    if (router.pathname.substring(0, 3) === "/member".substring(0, 3)) {
      setActive(true);
      if (router.pathname.substring(8, 9).length > 0) {
        setMemberMenu(router.pathname.substring(8, 9));
      } else {
        setMemberMenu("u");
      }
    }
  }, [router.pathname]);

  return (
    <>
      <div className="absolute lg:relative w-72 h-screen shadow bg-gray-100 hidden lg:block">
        <div className="flex items-center justify-center">
          <ul aria-orientation="vertical" className="py-6">
            {navbarLink.map((i) => (
              <li key={i.id} className={NavClass(i.href)} onClick={()=>router.push(i.href)}>
                <div className="flex items-center">
                  <span className="ml-2 pl-4 pr-4">
                    {i.title}
                  </span>
                </div>
              </li>
            ))}
            <li
              className={`${
                active ? `visible` : `invisible`
              } items-center w-full cursor-pointer text-sm leading-3 tracking-normal hover:text-indigo-700 focus:text-indigo-700 focus:outline-none`}
            >
              <div className="flex items-center">
                <span className="ml-2 pl-4 pr-4">
                  <Radio.Group value={memberMenu} defaultValue={memberMenu}>
                    <Radio value="u" size="xs">
                      <Link
                        href="/member"
                        className={memberMenu === "u" ? "text-indigo-500" : ""}
                      >
                        User
                      </Link>
                    </Radio>
                    <Radio value="r" size="xs">
                      <Link
                        href="/member/roles"
                        className={memberMenu === "r" ? "text-indigo-500" : ""}
                      >
                        Roles
                      </Link>
                    </Radio>
                    <Radio value="p" size="xs">
                      <Link
                        href="/member/permisions"
                        className={memberMenu === "p" ? "text-indigo-500" : ""}
                      >
                        Permisions
                      </Link>
                    </Radio>
                    <Radio value="v" size="xs">
                      <Link
                        href="/member/vendor"
                        className={memberMenu === "v" ? "text-indigo-500" : ""}
                      >
                        Vendor Group
                      </Link>
                    </Radio>
                  </Radio.Group>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
