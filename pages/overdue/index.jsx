/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarDetail,
  MainLayOut,
  OverdueBillingTable,
  OverdueBillingAllTable,
} from "@/components";
import { ColorInt } from "@/hooks";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Badge } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OverdueBillingPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [statusData, setStatusData] = useState([]);

  const fetchStatusData = async () => {
    setStatusData([]);
    let url = `${process.env.API_HOST}/status?vendor_group=${session?.user.vendor_group}`;
    if (session?.user.isAdmin) {
      url = `${process.env.API_HOST}/status`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: session?.user.accessToken,
      },
    });
    const data = await response.json();
    setStatusData(data.data);
  };

  useEffect(() => {
    if (session?.user) {
      if (session?.user.isAdmin) {
        router.push("/");
      }
      fetchStatusData();
    }
  }, [session]);
  return (
    <>
      <MainLayOut title="Overdue Billing">
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/overdue`}>Overdue Billing</Link>
          </span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between space-x-2">
            <div className="flex justify-start w-fit">
              <AvatarDetail user={session?.user} />
            </div>
            <div className="w-full">
              <Tabs>
                <TabList>
                  {statusData?.map((i, x) => (
                    <Tab key={x}>
                      <Badge
                        color={ColorInt(i.seq)}
                        content={i.billing.length > 0 ? i.billing.length : null}
                        placement="bottom-right"
                      >
                        {i.title}
                      </Badge>
                    </Tab>
                  ))}
                </TabList>

                <TabPanels>
                  {statusData?.map((i, x) => (
                    <TabPanel key={i.id}>
                      <div className="mt-4">
                        <OverdueBillingTable
                          vendor_group={session?.user.vendor_group}
                          status={i}
                          token={session?.user.accessToken}
                        />
                      </div>
                      <div className="mt-4">
                        <OverdueBillingAllTable
                          user={session?.user}
                          statusData={statusData}
                        />
                      </div>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </div>
      </MainLayOut>
    </>
  );
};

export default OverdueBillingPage;
