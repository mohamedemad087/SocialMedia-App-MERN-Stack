import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./styles";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))); // JSON.parse is to parse the string into a JavaScript object
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const theme = useTheme();
  const smallScreens = useMediaQuery(theme.breakpoints.up("sm"));
  const verySmallScreens = useMediaQuery(theme.breakpoints.up(375));

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant={smallScreens ? "h3" : verySmallScreens ? "h4" : "h5"}
          align="center"
        >
          Mem<span className={classes.logo}>ories</span>
        </Typography>
      </div>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <>
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                title={user.result.name}
                src={user.result.imageUrl}
                alt={user.result.name}
              >
                {user.result.name.charAt(0)}{" "}
                {/* If user don't have image, his first letter of his name will be appear */}
              </Avatar>
              {smallScreens ? (
                <Typography className={classes.userName} variant="h6">
                  {user.result.name}
                </Typography>
              ) : (
                ""
              )}
            </div>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
