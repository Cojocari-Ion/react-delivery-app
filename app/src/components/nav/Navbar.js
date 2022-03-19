import React from 'react'
import './Navbar.css'
import { useState} from 'react';
import logo from '../../assets/nav/logo.png';
import bucket from '../../assets/nav/bucket-fastfood.png'
import gmail from '../../assets/nav/gmail.png'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import {useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setUser } from '../../store/slice/userSlice';
import { useAuth } from '../../hooks/use-auth';
import { removeUser } from '../../store/slice/userSlice';
import Register from './register/Register';
import LogIn from './LogIn/LogIn';





const Navbar = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    

    const {isAuth} = useAuth();

    const currentUser = useSelector(state => state.user)


  return (
    <div className='left-side navbar'>
        <div className="nav-header">
            <img className='logo' src={logo} alt="logo" />     
            {
                isAuth ? (
                    <div>
                        <h5>hello {currentUser.email} </h5>
                        <button onClick={() => {dispatch(removeUser())}}>Log out</button>
                    </div>
                ) : (

                <div className="buttons modal-and-buttons">
                    <button className='log-in-button auth-button' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal1">Log in</button>
                    <button className='sing-up-button auth-button' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal2">Sign up</button>

                    {/* Sing up Modal */}
                    <Register />

                    {/* Log in Modal */}
                    <LogIn />
                </div>
                )
            }

        </div>

        <div className="nav-menu">
            
                <Link className='link' to={'/'}>
                    <div className="icon-container">
                        <i className="fa-solid fa-list"></i>
                    </div>

                    <span className='fs-3' >menu</span>
                </Link>

                <Link className='link' to={'/cart'}>
                    <div className="icon-container">
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </div>
                    <span className='fs-3'>cart</span>
                </Link>

                <Link className='link' to={'/settings'}>
                    <div className="icon-container">
                        <SettingsOutlinedIcon />

                    </div>
                    <span className='fs-3' >settings</span>
                </Link>
           
        </div>

    </div>
  )
}

export default Navbar