import OpenIncidentTable from "./OpenIncidentTable";
import RepeatedIncidents from "./RepeatedIncidents";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Typography,Stack } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { useSelector } from "react-redux";

const IncidentsLayout = () => {
    const [tabValue, setTabValue] = useState("1");
    const name = useSelector((state)=>state.auth.name);

    const handleChange = (event, value) => {
        /**
         * runs when the tab is clicked, responsible to send the value of the tab to the tabValue state
         */
        setTabValue(value);
    };

    return (
        /**
         * renders the tabs and the relevant component when the tab is clicked
         */
        <Box sx={{ width: "100%", typography: "body1" }}>
            
            <TabContext value={tabValue}>
            
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack direction="row" alignItems="center">
                <Box sx={{ flexGrow: 1 }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Open Incidents" value="1" />
                        <Tab label="Repeated Incidents" value="2" />
                        
                     
                    </TabList>
                    </Box>
                    <Typography sx={{ minWidth: 100 }}>{name}</Typography>
                    </Stack>
                </Box>

                <TabPanel value="1">
                    {" "}
                    <OpenIncidentTable />
                </TabPanel>
                <TabPanel value="2">
                    {" "}
                    <RepeatedIncidents />
                </TabPanel>
            </TabContext>
        </Box>
    );
};
export default IncidentsLayout;