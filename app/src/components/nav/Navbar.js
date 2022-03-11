import React from 'react'
import './Navbar.css'
import { useState, useEffect } from 'react';
import logo from '../../assets/nav/logo.png';
import bucket from '../../assets/nav/bucket-fastfood.png'
import gmail from '../../assets/nav/gmail.png'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { registerInitiate } from '../../redux/actions';

const Navbar = () => {

    const [state, setState] = useState({
        displayName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const { currentUser } = useSelector((state) => state.user);

    const history = useHistory()

    useEffect(() => {
        if (currentUser) {
            history.push("/");
        }
    }, [currentUser, history])

    const dispatch = useDispatch();


    const {email, password, displayName, passwordConfirm} = state;

   
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== passwordConfirm) {
            return;
        }
        dispatch(registerInitiate(email,password, displayName));
        setState({ email: '', displayName: '', password: '', passwordConfirm: '' })
    }

  return (
    <div className='left-side navbar'>
        <div className="nav-header">
            <img className='logo' src={logo} alt="logo" />
            <div className="buttons modal-and-buttons">
                <button className='log-in-button auth-button' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal1">Log in</button>
                <button className='sing-up-button auth-button' type='button' data-bs-toggle="modal" data-bs-target="#exampleModal2">Sign up</button>
                {/* Log in Modal */}
                <div className="modal fade modal-sing-up" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className=" modal-dialog modal-dialog-centered modal-lg">
                        <div className=" modal-content">
                            <div className=" content">
                                <div className="left-side sides">
                                    <div className="elipse">

                                    </div>

                                    <img className='fastfood' src={bucket} alt="fastfood" width='350px' />
                                </div>
                                <div className="divider">

                                </div>


                                <div className="right-side sides">
                                    <form>
                                        <span className='fs-1 tittle'>
                                            Sing up
                                        </span>
                                        <p className='fs-8'>If you have an account then <button data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={(e) => {e.preventDefault()}} data-bs-dismiss="modal" className='blue-button'>Log in</button> </p>
                                        <label className='username-label fs-5' for="username">Username:</label><br />
                                        <input type="text" id="username" name="username" placeholder='Your Username' ></input>

                                        <br />

                                        <label className='password-label fs-5' for="password">Password:</label><br />
                                        <input type="password" id="password" name="password" placeholder='Your Password' ></input>

                                        <br />

                                        <button className='fs-5 submit-button' type='submit'>
                                            submit
                                        </button>

                                        <p className='or-sing-up'>Or sign up with:</p>
                                        <img src={gmail} alt="gmail" />
                                    </form>

                                    <button data-bs-dismiss="modal" className='close-button'>
                                        <CancelRoundedIcon />

                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* Sign up Modal */}
                <div className="modal fade modal-log-in" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className=" modal-dialog modal-dialog-centered modal-md">
                        <div className=" modal-content">
                            <div className=" content">

                                <form onSubmit={handleSubmit()}>
                                    <span className='fs-1 tittle'>
                                        Log in
                                    </span>
                                    <p className='fs-8'>If you haven't an account then <button data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={(e) => {e.preventDefault()}} data-bs-dismiss="modal" className='blue-button'>Sing up</button> </p>
                                    <label className='username-label fs-5' for="username">Username:</label>
                                    <input type="text" id="username" name="username" placeholder='Your Username' ></input>

                                    <br />

                                    <label className='password-label fs-5' for="password">Password:</label>
                                    <input type="password" id="password" name="password" placeholder='Your Password' ></input>

                                    <br />

                                    <div className='gmail-log-in'>
                                        <span>log in with</span>
                                        <button>
                                            <img width='50px' src={gmail} alt="gmail" />

                                        </button>
                                    </div>

                                    <button className='fs-5 submit-button' type='submit'>
                                        submit
                                    </button>

                                    
                                </form>

                                <button data-bs-dismiss="modal" className='close-button'>
                                    <CancelRoundedIcon />
                                </button>
                               

                            </div>
                        </div>
                    </div>
                </div>
            </div>
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