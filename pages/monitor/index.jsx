import { MainLayOut, BillingActionTable } from "@/components";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Badge, Avatar, Grid } from "@nextui-org/react";

const BillingMonitorPage = () => {
  return (
    <>
      <MainLayOut title="Billing Monitor">
        <span className="text-4xm font-bold">Billing Monitor</span>
        <div className="mt-2">
          <Tabs>
            <TabList>
              <Tab>
                <Badge color="primary" content={5} placement="bottom-right">
                  On Process
                </Badge>
              </Tab>
              <Tab>
                <Badge color="success" content={10} placement="bottom-right">
                  Verify
                </Badge>
              </Tab>
              <Tab>
                <Badge color="error" content={3} placement="bottom-right">
                  Rejected
                </Badge>
              </Tab>
              <Tab>
                <Badge color="secondary" content={2} placement="bottom-right">
                  Approved
                </Badge>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="rounded-lg shadow">
                  <BillingActionTable status={`Verify`} limitPage={5} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="rounded-lg shadow">
                  <BillingActionTable status={`Approve`} limitPage={10}/>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="rounded-lg shadow">
                  <BillingActionTable status={`View`} limitPage={3} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="rounded-lg shadow">
                  <BillingActionTable status={`Approved`} limitPage={2}/>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </MainLayOut>
    </>
  );
};

export default BillingMonitorPage;
