import Link from "next/link";
import { useRouter } from "next/router";
import { Radio, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

/* eslint-disable jsx-a11y/role-supports-aria-props */
const navbarLinkAdmin = [
  {
    id: 0,
    title: "Import Data Billing",
    name: "index",
    href: "/",
    children: [],
    isAdmin: true,
  },
  {
    id: 1,
    title: "Billing Monitor",
    name: "monitor",
    href: "/monitor",
    children: [],
    isAdmin: true,
  },
  {
    id: 2,
    title: "Billing Report",
    name: "report",
    href: "/report",
    children: [],
    isAdmin: true,
  },
  {
    id: 3,
    title: "User Manangement",
    name: "member",
    href: "/member",
    children: [
      { id: 0, title: "User", name: "user", href: "/member" },
      { id: 1, title: "Roles", name: "roles", href: "/roles" },
      {
        id: 2,
        title: "Permissions",
        name: "permissions",
        href: "/permissions",
      },
      { id: 3, title: "Vendor Groups", name: "vendor", href: "/vendor" },
    ],
    isAdmin: true,
  },
];

const navbarLinkForUser = [
  {
    id: 4,
    title: "Overdue Billing",
    name: "overdue",
    href: "/overdue",
    children: [],
    isAdmin: false,
  },
  {
    id: 5,
    title: "Billing Report",
    name: "billing",
    href: "/billing",
    children: [],
    isAdmin: false,
  },
];

const SideBar = () => {
  const { data: session } = useSession();
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
      <div className="relative w-60 h-screen shadow bg-gray-100 block">
        <div className="flex">
          <ul aria-orientation="vertical" className="py-6">
            {session?.user.isAdmin
              ? navbarLinkAdmin.map((i) => (
                  <section key={i.id}>
                    <li
                      className={NavClass(i.href)}
                      onClick={() => router.push(i.href)}
                    >
                      <div className="flex items-center">
                        <span className="ml-2 pl-4 pr-4">{i.title}</span>
                      </div>
                    </li>
                    {i.children.length > 0 ? (
                      <li
                        className={`${
                          active ? `visible` : `hidden invisible`
                        } items-center w-full cursor-pointer text-sm leading-3 tracking-normal hover:text-indigo-700 focus:text-indigo-700 focus:outline-none`}
                      >
                        <div className="flex items-center">
                          <span className="ml-2 pl-4 pr-4">
                            <Radio.Group
                              value={memberMenu}
                              defaultValue={memberMenu}
                            >
                              <Radio value="u" size="xs">
                                <Link
                                  href="/member"
                                  className={
                                    memberMenu === "u" ? "text-indigo-500" : ""
                                  }
                                >
                                  User
                                </Link>
                              </Radio>
                              <Radio value="r" size="xs">
                                <Link
                                  href="/member/roles"
                                  className={
                                    memberMenu === "r" ? "text-indigo-500" : ""
                                  }
                                >
                                  Roles
                                </Link>
                              </Radio>
                              <Radio value="p" size="xs">
                                <Link
                                  href="/member/permissions"
                                  className={
                                    memberMenu === "p" ? "text-indigo-500" : ""
                                  }
                                >
                                  Permisions
                                </Link>
                              </Radio>
                              <Radio value="v" size="xs">
                                <Link
                                  href="/member/vendor"
                                  className={
                                    memberMenu === "v" ? "text-indigo-500" : ""
                                  }
                                >
                                  Vendor Group
                                </Link>
                              </Radio>
                              <Radio value="d" size="xs">
                                <Link
                                  href="/member/document"
                                  className={
                                    memberMenu === "d" ? "text-indigo-500" : ""
                                  }
                                >
                                  Document
                                </Link>
                              </Radio>
                            </Radio.Group>
                          </span>
                        </div>
                      </li>
                    ) : (
                      <></>
                    )}
                  </section>
                ))
              : navbarLinkForUser.map((i) => (
                  <section key={i.id}>
                    <li
                      className={NavClass(i.href)}
                      onClick={() => router.push(i.href)}
                    >
                      <div className="flex items-center">
                        <span className="ml-2 pl-4 pr-4">{i.title}</span>
                      </div>
                    </li>
                  </section>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
