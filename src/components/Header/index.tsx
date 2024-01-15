import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Input, InputAdornment } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeaderProps {
  searchedCampaign: string;
  setSearchedCampaign: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  setSearchedCampaign,
  searchedCampaign,
}) => {
  const [searchWidth, setSearchWidth] = useState<number>(180);
  const handleSearchClick = () => {
    setSearchWidth(300);
  };
  const handleSearchBlur = () => {
    setSearchWidth(180);
  };

  return (
    <AppBar position='static'>
      <Toolbar sx={{ maxHeight: "64px" }}>
        <Typography variant='h6' flexGrow={1} color={"#FFF"}>
          Campaigns
        </Typography>
        <Input
          size='small'
          value={searchedCampaign}
          placeholder='Search'
          className='search-input'
          disableUnderline
          startAdornment={
            <InputAdornment position='start'>
              <FontAwesomeIcon icon='search' />
            </InputAdornment>
          }
          sx={{
            width: `${searchWidth}px`,
            transition: "width 0.3s ease",
          }}
          onClick={handleSearchClick}
          onBlur={handleSearchBlur}
          onChange={(e) => setSearchedCampaign(e.target.value)}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
