import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserId } from '../../redux/actions/actions'
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import { style } from '@mui/system';
import Chip from '@mui/material/Chip';
import s from './Profile.module.css'
import { agregarSocker } from '../../redux/actions/actions';
import { Badge } from '@mui/material';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import { useState } from 'react';

const Profile = () => {
  const dispatch = useDispatch();
  const { user: { sub } } = useAuth0();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const users = useSelector(state => state.users)
  const navigate = useNavigate()
  const { logout, user: {picture} } = useAuth0();
  const socket = useSelector(state => state.socket)
  const [cantNotificaciones,setcantNotificaciones] = useState(0)

  useEffect(()=>{
    if (users.length === 0) {
      dispatch(getUserId(sub))
    }
  },[dispatch, users.img])

  useEffect(()=>{
    console.log(sub)
    if(sub)
    dispatch(agregarSocker(sub))
  },[sub])

  useEffect(()=>{
    console.log("wtfffffffffffff")
    socket?.on("obtenerNotificacion",({emisor_id,tipo}) => {
      setcantNotificaciones(cantNotificaciones+1)
    })
  },[socket])



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenProfile = () => {
    navigate(`/profile/user/${sub}`)
    setAnchorElUser(null);
  }
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
  }
  const handleSettings = () => {
    navigate('/profile/settings')
  }
  
  const handleContracts = () => {
    navigate("/contracts/user/"+sub);
    setAnchorElUser(null);
  }

  const settings = [
    {
      name: 'Profile',
      handler: handleOpenProfile
    }, 
    {
      name: "Contratos",
      handler: handleContracts
    },
    {
      name: "Settings",
      handler: handleSettings
    },
    {
      name: "Dashboard",
      handler: handleCloseUserMenu
    },
    {
      name: "Logout",
      handler: handleLogout
    }
    ];
  return (
    <>
    <div className={s.contenedor}>
    <div className={s.badge}>
    <Badge badgeContent={cantNotificaciones} color="primary">
  <NotificationsNoneTwoToneIcon/>
</Badge>
    </div>
    <div>
        <Chip className={s.name} label={`${users.name} ${users.lastName}`} variant="outlined" />
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
