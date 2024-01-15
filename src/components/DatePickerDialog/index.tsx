import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import moment, { Moment } from "moment";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { theme } from "../../main";

interface DatePickerDialogProps {
  open: boolean;
  startDate: string | undefined;
  endDate: string | undefined;
  dateType: "start" | "end";
  confirmSelectedDate: (date: string) => void;
  onClose: () => void;
}

const DatePickerDialog: React.FC<DatePickerDialogProps> = ({
  open,
  startDate,
  endDate,
  dateType,
  confirmSelectedDate,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

  const handleDateChange = (date: Moment | null) => {
    setSelectedDate(date);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOK = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      confirmSelectedDate(formattedDate);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle bgcolor={theme.palette.primary.main} color={"#FFF"}>
        <Typography variant='body1' fontSize={20} textAlign={"center"}>
          Select {dateType === "start" ? "Start" : "End"} Date
        </Typography>
      </DialogTitle>
      <DialogContent>
        <StaticDatePicker
          displayStaticWrapperAs='desktop'
          openTo='day'
          value={selectedDate}
          minDate={
            dateType === "end" && startDate
              ? moment(moment(startDate).toISOString())
              : undefined
          }
          maxDate={
            dateType === "start" && endDate
              ? moment(moment(endDate).toISOString())
              : undefined
          }
          onChange={handleDateChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleOK} color='primary'>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DatePickerDialog;
