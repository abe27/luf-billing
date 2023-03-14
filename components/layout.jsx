/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { NavBarTop, SideBar } from "@/components";

const MainLayOut = ({
  children,
  title = process.env.APP_NAME,
  description = process.env.APP_DESCRIPTION,
}) => {
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
