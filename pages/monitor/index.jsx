/* eslint-disable react-hooks/exhaustive-deps */
import { BillingActionTable, MainLayOut } from "@/components";
import { ColorInt } from "@/hooks";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Badge } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
let d = new Date();

const BillingMonitorPage = () => {
  const { data: session } = useSession();
  const [onDate, setOnDate] = useState("");
  const [invData, setInvData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [vendorGroup, setVendorGroup] = useState([]);

  const fetchStatus = async (status_id) => {
    if (session?.user) {
      let url = `${process.env.API_HOST}/status`;
      if (status_id) {
        url = `${process.env.API_HOST}/status?id=${status_id}`;
      }
      const res = await fetch(url, {
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

  const fetchData = async (obj) => {
    setInvData([]);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session?.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `${process.env.API_HOST}/billing/list`;
    if (obj) {
      url = `${process.env.API_HOST}/billing/list?status_id=${obj.status}&billing_no=${obj.billingNo}&billing_date=${obj.billingDate}`;
    }

    const res = await fetch(url, requestOptions);

    if (res.ok) {
      const data = await res.json();
      setInvData(data.data);
      return;
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
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
                      vendorGroup={vendorGroup}
                      onDate={onDate}
                      token={session?.user.accessToken}
                      reloadData={() => fetchStatus()}
                      statusID={i.id}
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
