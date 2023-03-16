import Link from "next/link";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Badge } from "@nextui-org/react";
import {
  AvatarDetail,
  MainLayOut,
  OverdueBillingTable,
  OverdueBillingAllTable,
} from "@/components";
import { useState } from "react";

const tabList = [
  { id: 0, title: "Open", total: 10, color: "primary" },
  { id: 1, title: "On Process", total: 5, color: "warning" },
  { id: 2, title: "Rejected", total: 3, color: "error" },
  { id: 3, title: "Approved", total: 10, color: "success" },
];

const OverdueBillingPage = () => {
  return (
    <>
      <MainLayOut title="Overdue Billing">
        <div className="flex justify-start space-x-1">
          <span className="text-4xm font-bold">
            <Link href={`/monitor`}>Overdue Billing</Link>
          </span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between space-x-2">
            <div className="flex justify-start w-fit">
              <AvatarDetail />
            </div>
            <div className="w-full">
              <Tabs>
                <TabList>
                  {tabList?.map((i, x) => (
                    <Tab key={x}>
                      <Badge
                        color={i.color}
                        content={i.total}
                        placement="bottom-right"
                      >
                        {i.title}
                      </Badge>
                    </Tab>
                  ))}
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <div className="mt-4">
                      <OverdueBillingTable />
                    </div>
                    <div className="mt-4">
                      <OverdueBillingAllTable />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="mt-4">
                      <OverdueBillingTable status="On Process" />
                    </div>
                    <div className="mt-4">
                      <OverdueBillingAllTable />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="mt-4">
                      <OverdueBillingTable status="Rejected" />
                    </div>
                    <div className="mt-4">
                      <OverdueBillingAllTable />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="mt-4">
                      <OverdueBillingTable status="Approved" />
                    </div>
                    <div className="mt-4">
                      <OverdueBillingAllTable />
                    </div>
                  </TabPanel>
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
