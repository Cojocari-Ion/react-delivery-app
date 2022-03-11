import * as types from './actionTypes';
import {auth} from '../utils/firebase'

const registerStart = () => ({
    type: types.REGISTER_START,
});

const registerSucces = (user) => ({
    type: types.REGISTER_SUCCES,
    payload: user,
});

const registerFail = (error) => ({
    type: types.REGISTER_FAIL,
    payload: error,
})

export const registerInitiate = (email, password, displayName) => {
    return function (dispatch) {
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
            user.updateProfile({
                displayName
            })
            dispatch(registerSucces(user));
        })
        .catch((error) => dispatch(registerFail(error.message)))
    };
};