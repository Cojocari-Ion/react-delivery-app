import React, { useEffect } from 'react';
import bucket from '../../../assets/nav/bucket-fastfood.png'
import gmail from '../../../assets/nav/gmail.png'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useState } from 'react';
import { setUser } from '../../../store/slice/userSlice';
import { useAuth } from '../../../hooks/use-auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase';



const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmit, setIsSUmbimt] = useState(false);

    const [emailError, setEmailError] = useState('');

    
    useEffect(() => {
        
        const emailValidate = () => {
            
            if (email.length == 0) {
                setEmailError("Email is required!");
            } else {
                setEmailError("");  
            }   
        }

        emailValidate();
        
    }, [email])

    const length = email.length;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const registerHandle = (e) => {
        e.preventDefault()
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

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        registerHandle();
      }
    };

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        const auth = getAuth(); 

        signInWithPopup(auth, provider)
        .then((result) => {
        
        dispatch(setUser({
            email: result.user.email,
            id: result.user.uid,
            token: result.user.accessToken,
        }));
        navigate('/');
        }).catch((error) => {
        console.log(error)
        })

        

    };

  return (
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
                        <form onKeyPress={handleKeypress} onSubmit={registerHandle} >
                            <span className='fs-1 tittle'>
                                Sign up
                            </span>
                            <br />
                            <label className='username-label fs-5' htmlFor="email">Email:</label><br />
                            <input onChange={(e) => {setEmail(e.target.value)}} type="email" id="sign-in-email" name="email" placeholder='Your email' ></input>
                            <br />

                            <label className='password-label fs-5' htmlFor="password">Password:</label><br />
                            <input onKeyPress={handleKeypress} onChange={(e) => {setPassword(e.target.value)}} type="password" id="sign-in-password" name="password" placeholder='Your Password' ></input>

                            <br />

                            <button  data-bs-dismiss="modal" className={`btn fs-5 submit-button`} type='submit'>
                                submit
                            </button>

                            <p className='fs-8'>If you have an account then <button data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={(e) => {e.preventDefault()}} tabindex="-1"data-bs-dismiss="modal" className='blue-button'>Log in</button></p>

                            <p className='or-sing-up'>Or sign up with:</p>

                            <button  data-bs-dismiss="modal" className='button-gmail' onClick={signInWithGoogle}>
                                <img src={gmail} alt="gmail" />

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

export default Register