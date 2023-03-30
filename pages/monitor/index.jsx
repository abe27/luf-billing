/* eslint-disable react-hooks/exhaustive-deps */
import { BillingActionTable, MainLayOut } from "@/components";
import { ColorInt } from "@/hooks";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Badge } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const BillingMonitorPage = () => {
  const { data: session } = useSession();
  const [statusData, setStatusData] = useState([]);
  const [vendorGroup, setVendorGroup] = useState([]);

  const fetchStatus = async () => {
    if (session?.user) {
      // let url = `${process.env.API_HOST}/status?seq=0`;
      const res = await fetch(`${process.env.API_HOST}/status`, {
        method: "GET",
        headers: {
          Authorization: session?.user.accessToken,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setStatusData(data.data);
      }
    }
  };

  const fetchVendorGroup = async () => {
    if (session?.user) {
      // let url = `${process.env.API_HOST}/status?seq=0`;
      const res = await fetch(`${process.env.API_HOST}/vendor/group`, {
        method: "GET",
        headers: {
          Authorization: session?.user.accessToken,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setVendorGroup(data.data);
      }
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchStatus();
      fetchVendorGroup();
    }
  }, [session]);
  return (
    <>
      <MainLayOut title="Billing Monitor">
        <span className="text-4xm font-bold">Billing Monitor</span>
        <div className="mt-2">
          <Tabs>
            <TabList>
              {statusData.map((i, x) => (
                <Tab key={i.id}>
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
              {statusData.map((i, x) => (
                <TabPanel key={i.id}>
                  <div className="rounded-lg shadow">
                    <BillingActionTable
                      status={i}
                      limitPage={i.billing.length}
                      statusData={statusData}
                      vendorGroup={vendorGroup}
                      invData={i.billing}
                      token={session?.user.accessToken}
                      reloadData={() => fetchStatus()}
                    />
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingMonitorPage;
