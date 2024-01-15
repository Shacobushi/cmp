import { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TablePagination,
  Tooltip,
} from "@mui/material";
import React from "react";
import { ProjectData } from "../../App";

interface TableProps {
  data: ProjectData[] | undefined;
  searchedCampaign: string;
  startDateFilter: string;
  endDateFilter: string;
  resetStartDate: () => void;
  resetEndDate: () => void;
  resetFilters: () => void;
  handleSidebar: () => void;
}
interface RowsProps {
  id: number;
  name: string;
  status: JSX.Element;
  startDate: string;
  endDate: string;
  budget: string;
}

function createData(
  id: number,
  name: string,
  status: JSX.Element,
  startDate: string,
  endDate: string,
  budget: string
) {
  return { id, name, status, startDate, endDate, budget };
}

const isActive = (startDate: string, endDate: string) => {
  const today = moment();
  return today.isAfter(moment(startDate), "day") &&
    today.isBefore(moment(endDate), "day") ? (
    <div className='status-container'>
      <FontAwesomeIcon className='status-icon active' icon='circle-check' />
      active
    </div>
  ) : (
    <div className='status-container'>
      <FontAwesomeIcon className='status-icon inactive' icon='circle-xmark' />
      inactive
    </div>
  );
};

const formatInUSD = (budget: number): string => {
  const formattedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(budget);

  return formattedCurrency;
};

const CampaignTable: React.FC<TableProps> = ({
  data,
  searchedCampaign,
  startDateFilter,
  endDateFilter,
  resetStartDate,
  resetEndDate,
  resetFilters,
  handleSidebar,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [startFilterActive, setStartFilterActive] = useState<boolean>();
  const [endFilterActive, setEndFilterActive] = useState<boolean>();
  const [rows, setRows] = useState<RowsProps[]>([]);
  const open = Boolean(anchorEl);
  const filteredRows = useMemo(() => {
    if (rows.length > 0) {
      let filteredRows = rows;
      if (searchedCampaign) {
        filteredRows = filteredRows.filter(
          (row) =>
            row.name &&
            row.name.toLowerCase().includes(searchedCampaign.toLowerCase())
        );
      }
      if (startDateFilter && startFilterActive) {
        filteredRows = filteredRows.filter(
          (row) =>
            row.startDate &&
            moment(row.startDate).isAfter(moment(startDateFilter), "day")
        );
      }
      if (endDateFilter && endFilterActive) {
        filteredRows = filteredRows.filter(
          (row) =>
            row.endDate &&
            moment(row.endDate).isBefore(moment(endDateFilter), "day")
        );
      }
      return filteredRows;
    } else {
      return [];
    }
  }, [
    rows,
    searchedCampaign,
    startDateFilter,
    startFilterActive,
    endDateFilter,
    endFilterActive,
  ]);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    resetFilters();
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChipClick = (type: "start" | "end") => {
    if (type === "start") {
      setStartFilterActive(!startFilterActive);
    } else {
      setEndFilterActive(!endFilterActive);
    }
  };
  useEffect(() => {
    if (startDateFilter) {
      setStartFilterActive(true);
    }
  }, [startDateFilter, data]);
  useEffect(() => {
    if (endDateFilter) {
      setEndFilterActive(true);
    }
  }, [endDateFilter, data]);

  useEffect(() => {
    if (data) {
      const rows = data.map((el) =>
        createData(
          el.id,
          el.name,
          isActive(el.startDate, el.endDate),
          el.startDate,
          el.endDate,
          formatInUSD(el.budget)
        )
      );
      setRows(rows);
    }
  }, [data]);

  return (
    <Paper sx={{ width: "100%" }}>
      <div className='table-actions'>
        <Box display={"flex"} alignItems={"center"}>
          <Tooltip title={<strong>Filter results</strong>}>
            <IconButton
              aria-label='filter'
              onClick={handleSidebar}
              sx={{ width: "48px", height: "48px" }}
            >
              <FontAwesomeIcon icon='filter' />
            </IconButton>
          </Tooltip>
          <Stack direction='row' spacing={1} marginLeft={5}>
            {startDateFilter && (
              <Chip
                id='start-chip'
                avatar={
                  startFilterActive ? <FontAwesomeIcon icon='check' /> : <></>
                }
                label={`Active since ${moment(startDateFilter).format(
                  "M/D/YYYY"
                )}`}
                onClick={() => handleChipClick("start")}
                onDelete={resetStartDate}
                deleteIcon={
                  <FontAwesomeIcon id='start-chip-delete' icon='circle-xmark' />
                }
              />
            )}
            {endDateFilter && (
              <Chip
                id='end-chip'
                avatar={
                  endFilterActive ? <FontAwesomeIcon icon='check' /> : <></>
                }
                label={`Active until ${moment(endDateFilter).format(
                  "M/D/YYYY"
                )}`}
                onClick={() => handleChipClick("end")}
                onDelete={resetEndDate}
                deleteIcon={
                  <FontAwesomeIcon icon='circle-xmark' id='end-chip-delete' />
                }
              />
            )}
          </Stack>
        </Box>
        <Tooltip title={<strong>Filter menu</strong>}>
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
            sx={{ width: "48px", height: "48px" }}
          >
            <FontAwesomeIcon icon='ellipsis-vertical' />
          </IconButton>
        </Tooltip>
        <Menu
          id='menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleMenuClose}>Clear All Filter</MenuItem>
        </Menu>
      </div>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Status</TableCell>
              <TableCell align='right'>Start date</TableCell>
              <TableCell align='right'>End date</TableCell>
              <TableCell align='right'>Budget</TableCell>
            </TableRow>
          </TableHead>
          {
            <TableBody>
              {filteredRows &&
                (rowsPerPage > 0
                  ? filteredRows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredRows
                ).map((row, index) => (
                  <TableRow key={row.name + index}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='left'>{row.status}</TableCell>
                    <TableCell align='right'>
                      {moment(row.startDate).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell align='right'>
                      {moment(row.endDate).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell align='right'>{row.budget}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          }
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_event, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const MemoizedCampaignTable = React.memo(CampaignTable);
export default MemoizedCampaignTable;
