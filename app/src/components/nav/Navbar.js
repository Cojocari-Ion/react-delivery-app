import React, { useEffect } from 'react'
import './Navbar.css'
import { useState} from 'react';
import logo from '../../assets/nav/logo.png';

import errorBurger from '../../assets/nav/error-burger.png';

import {useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';

import { setOutError } from '../../store/slice/errorSlice';
import { useAuth } from '../../hooks/use-auth';
import { removeUser } from '../../store/slice/userSlice';
import Register from './register/Register';
import LogIn from './LogIn/LogIn';

//bootstrap elements
import { Button, Modal } from 'react-bootstrap';
import TestModal from './test-modal/Modal';



const Navbar = () => {

    const [show, setShow] = useState(false);
    const [testShow, setTestShow] = useState(false);

    const testClose = () => {
        setTestShow(false)
        
    };
    
    const handleTestShow = () => setTestShow(true);
    
    const handleClose = () => {
        setShow(false)
        dispatch(setOutError())
    };
    
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {isAuth} = useAuth();

    const currentUser = useSelector(state => state.user)

    const getVisible = useSelector(state => state.error)

    const cart = useSelector(state => state.cart)

    const modalStyle = {
        display: 'block',
    }

    useEffect(() => {
        setShow(getVisible.visible)
    }, [getVisible])

  return (
    <div className='left-side navbar'>
        <div className="nav-header">
            <img className='logo' src={logo} alt="logo" />     
                {
                isAuth ? (
                    <div className='user-section'>
                        <span>Hello, {currentUser.email} </span>
                        <button className='log-out-button' onClick={() => {dispatch(removeUser())}}>
                            Log out
                            
                        </button>
                    </div>
                ) : (

                <div className="buttons modal-and-buttons">
                    <button className='log-in-button auth-button' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal1">Log in</button>
                    <button className='sing-up-button auth-button' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal2">Sign up</button>

                    {/* Sing up Modal */}
                    <Register />

                    {/* Log in Modal */}
                    <LogIn />

                    {/* Error Modal */}

                    <Modal className='modal-error' show={show} onHide={handleClose}>
                        <div className="content">
                            <img src={errorBurger} width='250px' alt="error-burger" />

                            <span className='fs-1' >OOPS!!!</span>
                            <span className='fs-5' >Incorrect Log in or Password</span>


                            <button className='try-again-button' onClick={handleClose} >
                                try again
                            </button>
                        </div>
                    </Modal>

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
                    <Badge badgeContent={cart.cartProducts.length} color="primary">
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