import React from 'react';
import { useState } from 'react';
import gmail from '../../../assets/nav/gmail.png';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/slice/userSlice';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const logInHandle = (e) => {
        //e.preventDefault()
        //const auth = getAuth();
        //
        //createUserWithEmailAndPassword(auth, email, password)
        //.then(({user}) => {
        //    
        //    dispatch(setUser({
        //        email: user.email,
        //        id: user.uid,
        //        token: user.accessToken,
        //    }));
        //    navigate('/');
        //})
        //.catch(console.error)
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.code)
        });
    }

    


  return (
    <div className="modal fade modal-log-in" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-centered modal-md">
            <div className=" modal-content">
                <div className=" content">

                    <form onSubmit={logInHandle}> 
                        <span className='fs-1 tittle'>
                            Log in
                        </span>
                        <p className='fs-8'>If you haven't an account then <button data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={(e) => {e.preventDefault()}} data-bs-dismiss="modal" className='blue-button'>Sing up</button> </p>
                        <label className='username-label fs-5' htmlFor="username">Username:</label>
                        <input onChange={(e) => {setEmail(e.target.value)}} type="text" id="log-in-username" name="username" placeholder='Your Username' ></input>

                        <br />

                        <label className='password-label fs-5' htmlFor="password">Password:</label>
                        <input onChange={(e) => {setPassword(e.target.value)}} type="password" id="log-in-password" name="password" placeholder='Your Password' ></input>

                        <br />

                        <div className='gmail-log-in'>
                            <span>log in with</span>
                            <button>
                                <img width='50px' src={gmail} alt="gmail" />

                            </button>
                        </div>

                        <button  className='fs-5 submit-button' type='submit'>
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
  )
}

export default LogIn