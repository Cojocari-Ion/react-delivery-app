import React from 'react'
import './Navbar.css'
import { useState} from 'react';
import logo from '../../assets/nav/logo.png';
import bucket from '../../assets/nav/bucket-fastfood.png'
import gmail from '../../assets/nav/gmail.png'
import {useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from '../../store/slice/userSlice';
import { removeUser } from '../../store/slice/userSlice';
import { useAuth } from '../../hooks/use-auth';



const Navbar = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const registerHandle = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
            }));
            navigate('/');
        })
        .catch(console.error)
    }

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
                                        <form >
                                            <span className='fs-1 tittle'>
                                                Sign up
                                            </span>
                                            <p className='fs-8'>If you have an account then <button data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={(e) => {e.preventDefault()}} data-bs-dismiss="modal" className='blue-button'>Log in</button> </p>
                                            <label className='username-label fs-5' htmlFor="username">Username:</label><br />
                                            <input onChange={(e) => {setEmail(e.target.value)}} type="text" id="sign-in-username" name="username" placeholder='Your Username' ></input>

                                            <br />

                                            <label className='password-label fs-5' htmlFor="password">Password:</label><br />
                                            <input onChange={(e) => {setPassword(e.target.value)}} type="password" id="sign-in-password" name="password" placeholder='Your Password' ></input>

                                            <br />

                                            <button className='fs-5 submit-button' type='submit'>
                                                submit
                                            </button>

                                            <p className='or-sing-up'>Or sign up with:</p>
                                            <img src={gmail} alt="gmail" />
                                        </form>

                                        <button onClick={registerHandle()} data-bs-dismiss="modal" className='close-button'>
                                            <CancelRoundedIcon />

                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Log in Modal */}
                    <div className="modal fade modal-log-in" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className=" modal-dialog modal-dialog-centered modal-md">
                            <div className=" modal-content">
                                <div className=" content">

                                    <form>
                                        <span className='fs-1 tittle'>
                                            Log in
                                        </span>
                                        <p className='fs-8'>If you haven't an account then <button data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={(e) => {e.preventDefault()}} data-bs-dismiss="modal" className='blue-button'>Sing up</button> </p>
                                        <label className='username-label fs-5' htmlFor="username">Username:</label>
                                        <input type="text" id="log-in-username" name="username" placeholder='Your Username' ></input>

                                        <br />

                                        <label className='password-label fs-5' htmlFor="password">Password:</label>
                                        <input type="password" id="log-in-password" name="password" placeholder='Your Password' ></input>

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