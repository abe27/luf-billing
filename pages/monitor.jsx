import { MainLayOut } from "@/components";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Badge, Avatar, Grid } from "@nextui-org/react";

const BillingMonitorPage = () => {
  return (
    <>
      <MainLayOut>
        <span className="text-4xm font-bold">Billing Monitor</span>
        <div className="mt-2">
          <Tabs>
            <TabList>
              <Tab>
                <Badge color="error" content={5}>
                  Ver
                </Badge>
              </Tab>
              <Tab>Two</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="rounded-lg shadow">
                  <p>one!</p>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="rounded-lg shadow">
                  <p>two!</p>
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
