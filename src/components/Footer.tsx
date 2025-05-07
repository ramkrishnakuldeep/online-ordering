import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const Footer = () => {
  const [value, setValue] = useState(1);
  return (
    <footer>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Link to="/">
          <BottomNavigationAction
            label="Home"
            icon={
              <IconButton>
                <HomeIcon />
              </IconButton>
            }
          />
        </Link>
        <Link to="/history">
          <BottomNavigationAction
            label="Order History"
            icon={
              <IconButton>
                <HistoryRoundedIcon fontSize="small" />
              </IconButton>
            }
          />
        </Link>
      </BottomNavigation>
    </footer>
  );
};

export default Footer;
