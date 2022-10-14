import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserId, changeStatus } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { style } from "@mui/system";
import Chip from "@mui/material/Chip";
import s from "./Profile.module.css";
import { agregarSocker } from "../../redux/actions/actions";
import { Badge } from "@mui/material";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Favorites from "../Favorites/Favorites";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const st = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Profile = () => {
  const dispatch = useDispatch();
  const {
    user: { sub },
  } = useAuth0();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const {
    logout,
    user: { picture },
  } = useAuth0();
  const socket = useSelector((state) => state.socket);
  const [cantNotificaciones, setcantNotificaciones] = useState(0);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUserId(sub));
    }
  }, [dispatch, users.img]);

  useEffect(() => {
    console.log(sub);
    if (sub) dispatch(agregarSocker(sub));
  }, [sub]);

  useEffect(() => {
    console.log("wtfffffffffffff");
    socket?.on("obtenerNotificacion", ({ emisor_id, tipo }) => {
      setcantNotificaciones(cantNotificaciones + 1);
    });
  }, [socket]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenProfile = () => {
    navigate(`/profile/user/${sub}`);
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(changeStatus(sub, false)).then((data) => logout());
  };
  const handleSettings = () => {
    navigate("/profile/settings");
  };

  const handleContracts = () => {
    navigate("/contracts/user/" + sub);
    setAnchorElUser(null);
  };

  const settings = [
    {
      name: "Profile",
      handler: handleOpenProfile,
    },
    {
      name: "Contratos",
      handler: handleContracts,
    },
    {
      name: "Settings",
      handler: handleSettings,
    },
    {
      name: "Dashboard",
      handler: handleCloseUserMenu,
    },
    {
      name: "Logout",
      handler: handleLogout,
    },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={s.contenedor}>
        <div className={s.badge}>
          <Badge badgeContent={cantNotificaciones} color="primary">
            <NotificationsNoneTwoToneIcon />
          </Badge>
        </div>
        <div className={s.but}>
          <Button onClick={handleOpen}>
            <FaHeart />
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={st}>
              <Favorites />
            </Box>
          </Modal>
        </div>
        <div>
          <Chip
            className={s.name}
            label={`${users.name} ${users.lastName}`}
            variant="outlined"
          />
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={users.img} />
            </IconButton>
          </Tooltip>
        </div>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting.name} onClick={setting.handler}>
              <Typography textAlign="center">{setting.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
};

export default Profile;
