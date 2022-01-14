import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Close, Menu as MenuIcon, Search } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStyles } from "./styles";
import { menuItems } from "./constants";
import { useDispatch } from "react-redux";
import { ROUTES_DICT } from "../../routes/routesDict";
import CommentForm from "../../pages/Comment/Forms/CommentForm";

function MenuDropdown({ isLogin, setLoginState }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!menuList.length) {
      if (isLogin) {
        setMenuList(menuItems);
      } else {
        setMenuList([
          {
            id: 1,
            title: "Inicio",
            onClick: (history) => {},
          },
          {
            id: 2,
            title: "Iniciar Sesión",
            onClick: (history) => {},
          },
          {
            id: 3,
            title: "Registrarse",
            onClick: (history) => {},
          },
        ]);
      }
    }
  }, [menuList, isLogin]);

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => setOpenMenu(false);

  return (
    <Grid
      item
      container
      justifyContent={"flex-end"}
      className={classes.menuContainer}
    >
      {isLogin && (
        <React.Fragment>
          <Grid item className="reporte">
            <Button
              color="primary"
              variant="contained"
              style={{
                borderRadius: 25,
                padding: "auto 1rem",
                color: "#fff",
                backgroundColor: "#00A796",
              }}
              onClick={() => setOpenDialog(true)}
            >
              Reportar
            </Button>
          </Grid>
          <Grid item>
            <Dialog
              open={openDialog}
              fullWidth
              classes={{ paperFullWidth: classes.customModal }}
              onClose={() => setOpenDialog(false)}
              maxWidth="sm"
            >
              <Close
                onClick={() => setOpenDialog(false)}
                className={classes.customModal__closeBtn}
              />
              <CommentForm
                onCompleteSubmit={() => {
                  setOpenDialog(false);
                }}
                onClickCancelButton={() => setOpenDialog(false)}
              />
            </Dialog>
          </Grid>
          <Grid item className="botones">
            <AccountCircleIcon
              className={classes.iconColor}
              onClick={() => {
                history.push(ROUTES_DICT.account);
              }}
            />
          </Grid>
          <Grid item>
            <Search className={classes.iconColor} />
          </Grid>
          <Grid item>
            <NotificationsNoneOutlinedIcon className={classes.iconColor} />
          </Grid>
        </React.Fragment>
      )}
      {isLogin && (
        <Grid item className={classes.menuIconContainer}>
          <Typography className={classes.menuIcon} onClick={handleClick}>
            <MenuIcon className={classes.icon} />
          </Typography>
        </Grid>
      )}
      <Menu
        id="simple-menu"
        anchorEl={openMenu}
        open={Boolean(openMenu)}
        keepMounted
        onClose={handleClose}
        classes={{ paper: classes.menuList }}
      >
        {menuList.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              handleClose();
              if (item.link) {
                history.push(item.link);
              } else {
                item.onClick(history, dispatch);
              }
            }}
          >
            {item.img && (
              <ListItemIcon className={classes.menuImg}>
                <FontAwesomeIcon icon={item.img} size={"1x"} />
              </ListItemIcon>
            )}
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
}

export default MenuDropdown;
