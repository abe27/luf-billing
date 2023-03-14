import Link from "next/link";
import { useRouter } from "next/router";

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
    name: "user",
    href: "/user",
  },
];

const SideBar = () => {
  const router = useRouter();
  const NavClass = obj => {
    if (router.pathname === obj.href) {
      return "items-center w-full bg-gray-200 rounded-lg cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5 text-indigo-700 focus:text-indigo-700 focus:outline-none"
    }
    return "items-center w-full hover:bg-gray-200 hover:rounded-lg cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
  }
  return (
    <>
      <div className="absolute lg:relative w-72 h-screen shadow bg-gray-100 hidden lg:block">
        <div className="flex items-center justify-center">
          <ul aria-orientation="vertical" className="py-6">
            {navbarLink.map((i) => (
              <li
                key={i.id}
                className={NavClass(i)}
              >
                <div className="flex items-center">
                  <span className="ml-2 pl-4 pr-4">
                    <Link href={i.href}>{i.title}</Link>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
