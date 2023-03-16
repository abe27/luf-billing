/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [showpass, setShowPass] = useState(false);
  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content={process.env.APP_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen items-center justify-center">
        <div className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg flex justify-between">
            <div className="flex items-start">
              <Image
                src="/bg.jpg"
                className="rounded-l"
                width={650}
                height={850}
              />
            </div>
            <div className="flex justify-end">
              <div className="grid grid-cols-1 w-96 p-10 mt-4 mb-10">
                <p
                  tabIndex={0}
                  className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
                >
                  {process.env.APP_NAME}
                </p>

                <p
                  tabIndex={0}
                  className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
                >
                  Sign In
                </p>
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute flex items-center pl-2 pt-2 h-full cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="email"
                      aria-labelledby="email"
                      type="email"
                      className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-10 mt-2"
                      placeholder="username"
                    />
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <div className="relative flex">
                    <div className="absolute flex items-center pl-2 pt-2 h-full cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="myInput"
                      type={showpass ? "text" : "password"}
                      className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-10 mt-2"
                    />
                    <div
                      onClick={() => setShowPass(!showpass)}
                      className="absolute right-0 mt-5 mr-2 cursor-pointer"
                    >
                      <div id="show">
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                            fill="#71717A"
                          />
                        </svg>
                      </div>
                      <div id="hide" className="hidden">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-eye-off"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#27272A"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <line x1={3} y1={3} x2={21} y2={21} />
                          <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                          <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/">
                    <button
                      role="button"
                      className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-sky-500 border hover:bg-sky-600 py-4 w-full rounded-lg"
                    >
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
