/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { NavBarTop, SideBar } from "@/components";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";

const MainLayOut = ({
  children,
  title = process.env.APP_NAME,
  description = process.env.APP_DESCRIPTION,
}) => {
  const { data: session } = useSession();

  const verifyToken = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(`${process.env.API_HOST}/verify`, requestOptions);
    if (res.status === 401) {
      signOut();
      return;
    }
  };

  useEffect(() => {
    if (session) {
      verifyToken();
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full bg-gray-50">
        <NavBarTop />
        <div className="flex flex-no-wrap">
          {/* Sidebar starts */}
          <SideBar />
          {/* Sidebar ends */}
          <div className="w-full p-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayOut;
