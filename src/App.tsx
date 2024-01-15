/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Header from "./components/Header";
import Table from "./components/Table";
import "./styles/index.scss";
import Sidebar from "./components/Sidebar";
import moment from "moment";

export interface ProjectData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
}

function App() {
  const [searchedCampaign, setSearchedCampaign] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<ProjectData[]>([]);
  const handleSidebar = () => {
    if (!sidebarWidth) {
      setSidebarWidth(200);
    } else {
      setSidebarWidth(0);
    }
  };
  const resetFilters = () => {
    setSearchedCampaign("");
    setStartDate("");
    setEndDate("");
  };
  const resetStartDate = () => {
    setStartDate("");
    setEndDate("");
  };
  const resetEndDate = () => {
    setEndDate("");
  };

  useEffect(() => {
    const addCampaigns = (arrOfData: ProjectData[]) => {
      const formattedData = arrOfData.map((el: ProjectData) => ({
        ...el,
        startDate: moment(el.startDate, "MM/DD/YYYY").toISOString(),
        endDate: moment(el.endDate, "MM/DD/YYYY").toISOString(),
      }));
      setData((prevData) => [...prevData, ...formattedData]);
    };

    (window as any).addCampaigns = addCampaigns;

    return () => {
      delete (window as any).addCampaigns;
    };
  }, []);

  return (
    <Box id='app' className='main-app'>
      <div id='main-section'>
        <Header
          searchedCampaign={searchedCampaign}
          setSearchedCampaign={setSearchedCampaign}
        />
        <Container
          maxWidth='xl'
          sx={{ marginTop: "20px", backgroundColor: "#fafafa" }}
        >
          <Table
            data={data}
            startDateFilter={startDate}
            endDateFilter={endDate}
            searchedCampaign={searchedCampaign}
            resetEndDate={resetEndDate}
            resetStartDate={resetStartDate}
            resetFilters={resetFilters}
            handleSidebar={handleSidebar}
          />
        </Container>
      </div>
      <Sidebar
        sidebarWidth={sidebarWidth}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleSidebar={handleSidebar}
      />
    </Box>
  );
}

export default App;
