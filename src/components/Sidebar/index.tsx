import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Box, Button, Fade, TextField, Typography } from "@mui/material";
import DatePickerDialog from "../DatePickerDialog";
import moment from "moment";

interface SidebarProps {
  sidebarWidth: number;
  startDate: string | undefined;
  endDate: string | undefined;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarWidth,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSidebar,
}) => {
  const [open, setOpen] = useState(false);
  const [dateType, setDateType] = useState<"start" | "end">("start");
  const handleClickOpen = (dateType: "start" | "end") => {
    setDateType(dateType !== "start" ? "end" : "start");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      id='sidebar'
      height={"100vh"}
      width={`${sidebarWidth}px`}
      sx={{
        transition: "width 0.3s ease",
        borderLeft: "1px solid #aca8a8",
      }}
    >
      <Fade
        in={sidebarWidth > 0}
        timeout={{ enter: 1000, exit: 100 }}
        style={{ display: sidebarWidth === 0 ? "none" : "inline-block" }}
      >
        <Box textAlign={"center"}>
          <Button
            className='filter-results-btn'
            variant='text'
            color='secondary'
            fullWidth
            onClick={handleSidebar}
            sx={{
              height: "64px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
            startIcon={<FontAwesomeIcon icon='chevron-right' />}
          >
            Filter Results
          </Button>
          <Typography variant='body1' gutterBottom paddingTop={"1rem"}>
            Filter by Period
          </Typography>
          <Box display={"flex"}>
            <TextField
              id='start'
              label='Start'
              value={startDate && moment(startDate).format("M/D/YYYY")}
              variant='standard'
              onClick={() => handleClickOpen("start")}
              InputProps={{
                readOnly: true,
              }}
              sx={{ margin: "0.5rem" }}
            />
            <TextField
              id='end'
              label='End'
              value={endDate && moment(endDate).format("M/D/YYYY")}
              variant='standard'
              disabled={!startDate}
              onClick={() => handleClickOpen("end")}
              sx={{ margin: "0.5rem" }}
            />
          </Box>
          <DatePickerDialog
            open={open}
            startDate={startDate}
            endDate={endDate}
            confirmSelectedDate={
              dateType === "start" ? setStartDate : setEndDate
            }
            dateType={dateType}
            onClose={handleClose}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default Sidebar;
